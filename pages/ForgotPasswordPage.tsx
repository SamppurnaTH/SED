import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import Logo from '../components/icons/Logo';
import { EmailIcon } from '../components/icons/AuthIcons';
import { API_URL } from '../constants';
import { useToast } from '../contexts/ToastContext';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
        const response = await fetch(`${API_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
             setSubmitted(true);
        } else {
             addToast(data.message || 'Failed to send reset email.', 'error');
        }
    } catch (error) {
        addToast('Network error. Please try again.', 'error');
    } finally {
        setIsLoading(false);
    }
  };
  
  if (submitted) {
    return (
      <AuthLayout>
        <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="mt-5 text-2xl font-poppins font-bold text-primary">Check your inbox</h2>
            <p className="mt-2 text-sm text-primary/80">We've sent a password reset link to <span className="font-bold text-primary">{email}</span>.</p>
            <p className="mt-4 text-xs text-primary/60">Note: If you are using the demo backend without an SMTP server, check the backend console logs for the reset link.</p>
            <div className="mt-6">
                <Link
                    to="/login"
                    className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-secondary bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
                >
                    Back to Sign In
                </Link>
            </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
        <div className="text-center md:hidden mb-8">
            <Link to="/" className="inline-block" aria-label="Go to homepage">
                <Logo className="h-14 w-14 mx-auto" />
            </Link>
        </div>
        <h2 className="text-3xl font-poppins font-bold text-primary text-center">Forgot your password?</h2>
        <p className="mt-2 text-center text-sm text-primary/80">
            Enter your email and we'll send you a reset link. Or{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
                sign in.
            </Link>
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                 <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <EmailIcon className="h-5 w-5 text-primary/40" aria-hidden="true" />
                    </span>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="appearance-none block w-full pl-10 pr-3 py-3 border border-primary/30 rounded-lg shadow-sm placeholder-primary/50 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>
            </div>

            <div>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-secondary bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 disabled:bg-primary/70"
            >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
            </div>
        </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;