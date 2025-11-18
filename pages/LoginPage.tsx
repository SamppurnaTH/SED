
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../contexts/AuthContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import Logo from '../components/icons/Logo';
import { EmailIcon, PasswordIcon, EyeIcon, EyeOffIcon, GoogleIcon } from '../components/icons/AuthIcons';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | React.ReactNode>('');
  const [isLoading, setIsLoading] = useState(false);
  const { login: studentLogin } = useAuth();
  const { login: adminLogin } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in both fields.');
      setIsLoading(false);
      return;
    }

    if (email.toLowerCase().endsWith('@sed.com')) {
      try {
        const user = await adminLogin(email, password);
        if (user) {
          if (user.role === 'trainer') {
            navigate('/trainer/dashboard');
          } else {
            navigate('/admin/dashboard');
          }
        } else {
          setError('Invalid credentials. Please try again.');
        }
      } catch (err: any) {
        console.error("Admin login failed:", err);
        setError(err.message || 'An unexpected error occurred during admin login.');
      } finally {
        setIsLoading(false);
      }
    } else {
        try {
            await studentLogin(email, password);
            navigate('/');
        } catch (err: any) {
            console.error("Student login failed:", err);
            setError(err.message || 'An unexpected error occurred during login.');
        } finally {
            setIsLoading(false);
        }
    }
  };

  return (
    <AuthLayout>
      <div className="text-center md:hidden mb-8">
          <Link to="/" className="inline-block" aria-label="Go to homepage">
            <Logo className="h-14 w-14 mx-auto" />
          </Link>
        </div>
      <h2 className="text-3xl font-poppins font-bold text-text-primary text-center">Welcome Back!</h2>
      <p className="mt-2 text-center text-sm text-text-muted">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>

      <div className="mt-8">
        <button
          type="button"
          className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-bold text-text-primary bg-white hover:bg-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
        >
          <GoogleIcon className="w-5 h-5" />
          Continue with Google
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary sr-only">
            Email address
          </label>
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
          <label htmlFor="password" className="block text-sm font-medium text-text-primary sr-only">
            Password
          </label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <PasswordIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-500" />
                ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
            </button>
          </div>
        </div>
        
        {error && <div className="text-sm text-red-600 font-bold text-center">{error}</div>}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-text-primary">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-accent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-300 disabled:bg-accent/70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                </>
            ) : (
              'Sign In'
            )}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;