import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/icons/Logo';
// FIX: Corrected import for UserIcon. It is now imported from AuthIcons.tsx where it has been consolidated.
import { EmailIcon, PasswordIcon, EyeIcon, EyeOffIcon, GoogleIcon, UserIcon as NameIcon } from '../components/icons/AuthIcons';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (email.toLowerCase().endsWith('@sed.com')) {
      setError('This email domain is reserved for administration and cannot be used for registration.');
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setError('Please enter a valid email address.');
        return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }
    
    try {
        await register({ name, email }, password);
        navigate('/');
    } catch (err: any) {
        setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <AuthLayout>
      <div className="text-center md:hidden mb-8">
          <Link to="/" className="inline-block" aria-label="Go to homepage">
            <Logo className="h-14 w-14 mx-auto" />
          </Link>
      </div>
      <h2 className="text-3xl font-poppins font-bold text-text-primary text-center">Create your account</h2>
      <p className="mt-2 text-center text-sm text-text-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>

       <div className="mt-8">
        <button
          type="button"
          className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-bold text-text-primary bg-white hover:bg-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
        >
          <GoogleIcon className="w-5 h-5" />
          Sign up with Google
        </button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-secondary text-text-muted">Or with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
         <div>
          <label htmlFor="name" className="sr-only">Full Name</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <NameIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <div className="relative">
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
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="relative">
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
              placeholder="Password"
              className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3" aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
            </button>
          </div>
          <PasswordStrengthMeter password={password} />
        </div>
        
        <div>
          <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
          <div className="relative">
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
              placeholder="Confirm Password"
              className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
             <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3" aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                {showConfirmPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-600 font-bold text-center">{error}</p>}

        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-accent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-300"
          >
            Create Account
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
