import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import Logo from '../components/icons/Logo';
import { PasswordIcon, EyeIcon, EyeOffIcon } from '../components/icons/AuthIcons';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }

    console.log('Password has been reset.');
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
            <h2 className="mt-5 text-2xl font-poppins font-bold text-dark-gray">Password Updated!</h2>
            <p className="mt-2 text-sm text-dark-gray/80">You can now sign in with your new password.</p>
            <div className="mt-6">
                <Link
                    to="/login"
                    className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
                >
                    Proceed to Sign In
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
        <h2 className="text-3xl font-poppins font-bold text-dark-gray text-center">Set a new password</h2>
        <p className="mt-2 text-center text-sm text-dark-gray/80">Create a new, strong password for your account.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="password" className="sr-only">New Password</label>
           <div className="relative mt-1">
             <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <PasswordIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
             <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3" aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
            </button>
          </div>
          <PasswordStrengthMeter password={password} />
        </div>
        
        <div>
          <label htmlFor="confirm-password" className="sr-only">Confirm New Password</label>
           <div className="relative mt-1">
             <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <PasswordIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
            <input
              id="confirm-password"
              name="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3" aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                {showConfirmPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
          >
            Update Password
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
