
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { EmailIcon, UserIcon as NameIcon, PasswordIcon, EyeIcon, EyeOffIcon } from '../components/icons/AuthIcons';
import { ReceiptIcon } from '../components/icons/DashboardIcons';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import MetaTags from '../components/MetaTags';
import { useToast } from '../contexts/ToastContext';
import { API_URL } from '../constants';

interface OrderHistoryItem {
    _id: string;
    orderId: string;
    amount: number;
    paymentMethod: string;
    createdAt: string;
    course: {
        name: string;
        slug: string;
    };
}

const ProfilePage: React.FC = () => {
  const { user, updatePassword, updateProfileImage } = useAuth();
  const { addToast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
      const fetchOrders = async () => {
          const token = localStorage.getItem('studentToken');
          if (!token) return;
          try {
              const response = await fetch(`${API_URL}/orders/my-orders`, {
                  headers: { 'Authorization': `Bearer ${token}` }
              });
              if (response.ok) {
                  const data = await response.json();
                  setOrders(data);
              }
          } catch (error) {
              console.error("Failed to fetch orders", error);
          } finally {
              setLoadingOrders(false);
          }
      };
      fetchOrders();
  }, []);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      addToast('New passwords do not match.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      addToast('New password must be at least 6 characters long.', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword(currentPassword, newPassword);
      addToast('Your password has been updated successfully!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      addToast(err.message || 'An unexpected error occurred.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      if (!file.type.startsWith('image/')) {
          addToast('Please select a valid image file.', 'error');
          return;
      }
      if (file.size > 5 * 1024 * 1024) {
          addToast('File size too large. Max 5MB.', 'error');
          return;
      }

      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', file);
      
      try {
          // 1. Upload Image
          const token = localStorage.getItem('studentToken');
          const uploadRes = await fetch(`${API_URL}/upload`, {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${token}` },
              body: formData
          });
          
          if (!uploadRes.ok) throw new Error('Image upload failed');
          const uploadData = await uploadRes.json();
          
          // 2. Update User Profile
          await updateProfileImage(uploadData.url);
          addToast('Profile picture updated successfully!', 'success');
          
      } catch (error) {
          console.error(error);
          addToast('Failed to upload profile picture.', 'error');
      } finally {
          setIsUploading(false);
      }
  };
  
  return (
    <>
      <MetaTags
        title="My Profile | SED Tech Academy"
        description="Manage your profile and account settings."
      />

      <section className="bg-secondary pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-6">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-text-primary">
            Profile & Settings
          </h1>
          <p className="mt-4 text-lg text-text-muted">
            Manage your account details, payment history, and password.
          </p>
        </div>
      </section>
      
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="grid grid-cols-1 gap-12">
            {/* Profile Details */}
            <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h2 className="font-poppins font-bold text-2xl text-text-primary">Your Details</h2>
                  
                  {/* Profile Picture Avatar & Upload */}
                  <div className="relative group">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/20">
                          {user?.avatarUrl ? (
                              <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                              <NameIcon className="w-10 h-10 text-primary" />
                          )}
                      </div>
                      <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full cursor-pointer hover:bg-accent transition-colors shadow-md">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                          <input 
                            id="avatar-upload" 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageUpload}
                            disabled={isUploading}
                          />
                      </label>
                      {isUploading && (
                          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-full">
                               <svg className="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                          </div>
                      )}
                  </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <NameIcon className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-text-muted">Name</p>
                    <p className="font-semibold text-text-primary">{user?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <EmailIcon className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-text-muted">Email</p>
                    <p className="font-semibold text-text-primary">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-200">
                <h2 className="font-poppins font-bold text-2xl text-text-primary mb-6 flex items-center gap-3">
                    <ReceiptIcon className="w-6 h-6 text-primary" />
                    Payment History
                </h2>
                {loadingOrders ? (
                    <p>Loading history...</p>
                ) : orders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-text-primary">
                            <thead className="text-xs text-text-muted uppercase bg-gray-50 border-b">
                                <tr>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Course</th>
                                    <th className="px-4 py-3">Order ID</th>
                                    <th className="px-4 py-3 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="px-4 py-4 font-medium">{order.course?.name || 'Unknown Course'}</td>
                                        <td className="px-4 py-4 font-mono text-xs text-text-muted">{order.orderId}</td>
                                        <td className="px-4 py-4 text-right font-semibold">₹{order.amount.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-text-muted">No payment history found.</p>
                )}
            </div>

            {/* Change Password */}
            <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-200">
              <h2 className="font-poppins font-bold text-2xl text-text-primary mb-6">Change Password</h2>
              <form onSubmit={handlePasswordUpdate} className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-text-primary">Current Password</label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"><PasswordIcon className="h-5 w-5 text-gray-400"/></span>
                    <input id="currentPassword" type={showCurrentPassword ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="pl-10 pr-10 block w-full border-gray-300 rounded-lg shadow-sm p-3"/>
                    <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center"><span className="sr-only">Toggle visibility</span>{showCurrentPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500"/> : <EyeIcon className="h-5 w-5 text-gray-500"/>}</button>
                  </div>
                </div>
                 <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-text-primary">New Password</label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"><PasswordIcon className="h-5 w-5 text-gray-400"/></span>
                    <input id="newPassword" type={showNewPassword ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="pl-10 pr-10 block w-full border-gray-300 rounded-lg shadow-sm p-3"/>
                     <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center"><span className="sr-only">Toggle visibility</span>{showNewPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500"/> : <EyeIcon className="h-5 w-5 text-gray-500"/>}</button>
                  </div>
                   <PasswordStrengthMeter password={newPassword} />
                </div>
                 <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary">Confirm New Password</label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"><PasswordIcon className="h-5 w-5 text-gray-400"/></span>
                    <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm p-3"/>
                  </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" disabled={isLoading} className="bg-primary text-white font-poppins font-bold py-3 px-8 rounded-lg hover:bg-accent disabled:bg-gray-400 flex items-center justify-center transition-all duration-300">
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Updating...
                            </>
                        ) : 'Update Password'}
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
