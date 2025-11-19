import React, { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useCourses } from '../contexts/CoursesContext';
import { useAuth } from '../contexts/AuthContext';
import { CreditCardIcon, UpiIcon, NetBankingIcon } from '../components/icons/paymentIcons';
import { Order } from '../types';
import { API_URL } from '../constants';
import { useToast } from '../contexts/ToastContext';
import Logo from '../components/icons/Logo';
import { trackEvent } from '../services/analytics';

const CheckoutPage: React.FC = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const { getCourseBySlug } = useCourses();
  const { user } = useAuth();
  const navigate = useNavigate();
  const course = getCourseBySlug(courseSlug || '');
  const { addToast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState('online'); // Default generic 'online' for Razorpay
  const [isProcessing, setIsProcessing] = useState(false);

  if (!course) {
    return <Navigate to="/programs" replace />;
  }
  
  // Total amount calculation (adding GST)
  const gstRate = 0.18;
  const totalAmount = course.pricing.amount * (1 + gstRate);

  // Helper to load Razorpay Script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
        const res = await loadRazorpayScript();
        if (!res) {
            addToast('Razorpay SDK failed to load. Are you online?', 'error');
            setIsProcessing(false);
            return;
        }
        
        // 1. Create Order on Backend
        const orderResponse = await fetch(`${API_URL}/orders/create-order`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRF-Token': window.csrfToken || '',
            },
            body: JSON.stringify({
                courseSlug: course.slug,
                amount: totalAmount,
            }),
            credentials: 'include',
        });

        const orderData = await orderResponse.json();

        if (!orderResponse.ok) {
            throw new Error(orderData.message || 'Failed to initiate payment');
        }

        // 2. Configure Razorpay Options
        const options = {
            key: orderData.key_id, 
            amount: orderData.amount,
            currency: orderData.currency,
            name: "SCHOLASTIC A EDU. DEPOT",
            description: `Enrollment for ${course.name}`,
            image: "/logo.png",
            order_id: orderData.id,
            handler: async function (response: any) {
                // 3. Verify Payment on Backend
                try {
                    const verifyResponse = await fetch(`${API_URL}/orders/verify-payment`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-Token': window.csrfToken || '',
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            courseSlug: course.slug,
                            amount: totalAmount
                        }),
                        credentials: 'include',
                    });

                    const verifyData = await verifyResponse.json();

                    if (verifyResponse.ok) {
                         const orderDetails: Order = {
                            course,
                            orderId: verifyData.orderId,
                            transactionDate: verifyData.transactionDate,
                            paymentMethod: 'Razorpay',
                        };
                        // Track successful purchase event
                        trackEvent('purchase', {
                            currency: 'INR',
                            value: totalAmount,
                            transaction_id: verifyData.orderId,
                            items: [{
                                item_id: course.slug,
                                item_name: course.name,
                                price: course.pricing.amount,
                                quantity: 1
                            }]
                        });
                        navigate('/order-confirmation', { state: { order: orderDetails }, replace: true });
                    } else {
                        addToast(verifyData.message || 'Payment verification failed', 'error');
                    }
                } catch (err) {
                    addToast('Server error during verification', 'error');
                }
            },
            prefill: {
                name: user?.name,
                email: user?.email,
            },
            notes: {
                address: "SED Corporate Office"
            },
            theme: {
                color: "#010133" // Primary color
            }
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
        
        paymentObject.on('payment.failed', function (response: any){
            addToast(response.error.description, 'error');
            setIsProcessing(false);
        });

    } catch (error: any) {
        console.error("Checkout error:", error);
        addToast(error.message || 'Transaction failed. Please try again.', 'error');
        setIsProcessing(false);
    }
  };

  return (
    <section className="bg-background pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container mx-auto px-6">
        <h1 className="font-poppins font-bold text-4xl text-center text-text-primary mb-12">Secure Checkout</h1>
        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Left Side: Payment Options */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-200">
              <h2 className="font-poppins font-semibold text-2xl text-text-primary mb-6">Payment Method</h2>
              <div className="space-y-4">
                <p className="text-text-muted mb-4">
                    All payments are secured by Razorpay. We support Credit/Debit Cards, Net Banking, UPI, and Wallets.
                </p>
                
                {/* Online Payment (Razorpay) */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === 'online' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                  }`}
                  onClick={() => setPaymentMethod('online')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input type="radio" name="paymentMethod" value="online" checked={paymentMethod === 'online'} readOnly className="h-4 w-4 text-primary focus:ring-primary" />
                        <label className="ml-3 flex items-center text-lg font-medium text-text-primary">
                        Pay Online (Razorpay)
                        </label>
                    </div>
                    <div className="flex space-x-2 text-text-muted">
                        <CreditCardIcon className="w-6 h-6" />
                        <UpiIcon className="w-6 h-6" />
                        <NetBankingIcon className="w-6 h-6" />
                    </div>
                  </div>
                  {paymentMethod === 'online' && (
                    <div className="mt-3 pl-8 text-sm text-text-muted">
                        You will be redirected to a secure payment gateway to complete your transaction.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-200 sticky top-32">
              <h2 className="font-poppins font-semibold text-2xl text-text-primary mb-6 border-b pb-4">Order Summary</h2>
              <div className="flex items-center space-x-4">
                <img src={course.imageUrl} alt={course.name} className="w-24 h-24 rounded-lg object-cover" loading="lazy" decoding="async" />
                <div>
                  <h3 className="font-poppins font-bold text-lg text-text-primary">{course.name}</h3>
                  <p className="text-text-muted">{course.tagline}</p>
                </div>
              </div>
              <div className="mt-6 space-y-2 border-t pt-4">
                <div className="flex justify-between text-text-muted">
                  <p>Subtotal</p>
                  <p>₹{course.pricing.amount.toLocaleString('en-IN')}</p>
                </div>
                 <div className="flex justify-between text-text-muted">
                  <p>Taxes (18% GST)</p>
                  <p>₹{(course.pricing.amount * 0.18).toLocaleString('en-IN')}</p>
                </div>
                <div className="flex justify-between font-bold text-xl text-text-primary border-t pt-2 mt-2">
                  <p>Total</p>
                  <p>₹{totalAmount.toLocaleString('en-IN')}</p>
                </div>
              </div>
              <form onSubmit={handlePayment}>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-8 bg-accent text-white font-poppins font-bold py-4 px-8 text-center rounded-lg hover:opacity-90 transition-all duration-300 disabled:bg-accent/70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : `Pay ₹${totalAmount.toLocaleString('en-IN')}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;