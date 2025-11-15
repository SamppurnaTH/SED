import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import Logo from '../components/icons/Logo';
import { EmailIcon } from '../components/icons/AuthIcons';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
    setSubmitted(true);
  };
  
  if (submitted) {
    return (
      <AuthLayout>
        <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="mt-5 text-2xl font-poppins font-bold text-dark-gray">Check your inbox</h2>
            <p className="mt-2 text-sm text-dark-gray/80">We've sent a password reset link to <span className="font-bold text-primary">{email}</span>.</p>
            <div className="mt-6">
                <Link
                    to="/login"
                    className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
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
        <h2 className="text-3xl font-poppins font-bold text-dark-gray text-center">Forgot your password?</h2>
        <p className="mt-2 text-center text-sm text-dark-gray/80">
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
                        <EmailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                        className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>
            </div>

            <div>
            <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
            >
                Send Reset Link
            </button>
            </div>
        </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
