import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { API_URL } from '../constants';

const EmailConfirmationPage: React.FC = () => {
  const { verificationToken } = useParams<{ verificationToken: string }>();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your email address...');

  useEffect(() => {
    const verifyToken = async () => {
      if (!verificationToken) {
        setStatus('error');
        setMessage('No verification token provided.');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/verify-email/${verificationToken}`);
        const data = await response.json();
        
        if (response.ok) {
          setStatus('success');
          setMessage(data.message);
        } else {
          setStatus('error');
          setMessage(data.message || 'Verification failed. The link may be invalid or expired.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('A network error occurred. Please try again.');
      }
    };

    verifyToken();
  }, [verificationToken]);

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h2 className="mt-5 text-2xl font-poppins font-bold text-primary">{message}</h2>
          </div>
        );
      case 'success':
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="mt-5 text-2xl font-poppins font-bold text-primary">Email Verified!</h2>
            <p className="mt-2 text-sm text-primary/80">{message}</p>
            <div className="mt-6">
                <Link to="/login" className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-accent hover:opacity-90">
                    Proceed to Sign In
                </Link>
            </div>
          </div>
        );
      case 'error':
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </div>
            <h2 className="mt-5 text-2xl font-poppins font-bold text-red-700">Verification Failed</h2>
            <p className="mt-2 text-sm text-primary/80">{message}</p>
            <div className="mt-6">
                <Link to="/login" className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-accent hover:opacity-90">
                    Back to Sign In
                </Link>
            </div>
          </div>
        );
    }
  };

  return <AuthLayout>{renderContent()}</AuthLayout>;
};

export default EmailConfirmationPage;