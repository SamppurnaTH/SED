import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { Order } from '../types';

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const order = location.state?.order as Order | undefined;

  if (!order) {
    return <Navigate to="/programs" replace />;
  }
  
  const totalAmount = order.course.pricing.amount * 1.18;

  const paymentMethodLabels: { [key: string]: string } = {
    card: 'Credit/Debit Card',
    upi: 'UPI',
    netbanking: 'Net Banking',
    razorpay: 'Online Payment'
  };

  return (
    <section className="bg-secondary pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-primary/10 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
            <svg className="h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-4xl text-primary">Enrollment Confirmed!</h1>
          <p className="mt-4 text-lg text-primary/80">
            Thank you for your payment. You are now enrolled in the {order.course.name} program.
          </p>
          
          <div className="mt-8 text-left bg-secondary/50 p-6 rounded-lg border border-primary/10 space-y-3">
            <h2 className="font-poppins font-semibold text-xl text-primary border-b border-primary/20 pb-2 mb-4">Order Details</h2>
            <div className="flex justify-between">
              <span className="text-primary/70">Order ID:</span>
              <span className="font-mono text-primary">{order.orderId}</span>
            </div>
             <div className="flex justify-between">
              <span className="text-primary/70">Date:</span>
              <span className="font-medium text-primary">{new Date(order.transactionDate).toLocaleDateString()}</span>
            </div>
             <div className="flex justify-between">
              <span className="text-primary/70">Course:</span>
              <span className="font-medium text-primary">{order.course.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary/70">Payment Method:</span>
              <span className="font-medium text-primary">{paymentMethodLabels[order.paymentMethod.toLowerCase()] || 'Online'}</span>
            </div>
             <div className="flex justify-between font-bold text-lg text-primary border-t border-primary/20 pt-3 mt-3">
              <span>Total Paid:</span>
              <span>₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-poppins font-semibold text-xl text-primary">What's Next?</h3>
            <p className="mt-2 text-primary/80">
              You will receive a confirmation email shortly with details on how to get started. You can also view your saved courses on your dashboard.
            </p>
            <Link
              to="/dashboard"
              className="inline-block mt-6 bg-primary text-secondary font-poppins font-bold py-3 px-8 rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 transform"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmationPage;