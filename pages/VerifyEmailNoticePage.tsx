import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { API_URL } from '../constants';
import { useToast } from '../contexts/ToastContext';

const VerifyEmailNoticePage: React.FC = () => {
    const location = useLocation();
    const email = location.state?.email;
    const { addToast } = useToast();
    const [isResending, setIsResending] = useState(false);
    
    const handleResend = async () => {
        if (!email) {
            addToast('Email address not found. Please try registering again.', 'error');
            return;
        }
        setIsResending(true);
        try {
            const response = await fetch(`${API_URL}/auth/resend-verification`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': window.csrfToken || '',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            addToast('A new verification email has been sent.', 'success');
        } catch (err: any) {
            addToast(err.message || 'Failed to resend email.', 'error');
        } finally {
            setIsResending(false);
        }
    };

    return (
        <AuthLayout>
            <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                    <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 className="mt-5 text-2xl font-poppins font-bold text-primary">Verify Your Email</h2>
                <p className="mt-2 text-sm text-primary/80">
                    We've sent a verification link to your email address:
                </p>
                {email && <p className="font-bold text-primary mt-1">{email}</p>}
                <p className="mt-4 text-xs text-primary/60">
                    Please check your inbox (and spam folder) and click the link to activate your account.
                </p>
                <div className="mt-6 space-y-3">
                    <button
                        onClick={handleResend}
                        disabled={isResending}
                        className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-accent hover:opacity-90 disabled:bg-accent/70"
                    >
                        {isResending ? 'Sending...' : 'Resend Verification Email'}
                    </button>
                    <Link
                        to="/login"
                        className="w-full inline-flex justify-center py-3 px-4 border border-primary/20 rounded-lg shadow-sm text-sm font-bold text-primary bg-transparent hover:bg-primary/5"
                    >
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
};

export default VerifyEmailNoticePage;