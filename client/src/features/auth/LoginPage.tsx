
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Shield, ArrowLeft, User, GraduationCap } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { ViewState } from '../../App';

interface LoginPageProps {
  onNavigate: (view: ViewState) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Logged in successfully! Redirecting to dashboard...');
      onNavigate('student'); // Redirect to student dashboard by default for this demo
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Visual & Benefits (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white relative overflow-hidden flex-col justify-between p-16">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-600/40 via-slate-900 to-slate-900"></div>
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Coding workspace"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center font-bold">S</div>
            <span className="text-xl font-display font-bold">SED<span className="text-brand-500">.</span></span>
          </div>
          <h1 className="text-4xl font-display font-bold mb-6 leading-tight">
            Welcome back, <br />
            <span className="text-brand-400">Future Leader.</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-md leading-relaxed">
            Continue your learning journey where you left off.
          </p>
        </div>

        {/* Quote */}
        <div className="relative z-10 p-6 bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700 mt-8">
          <p className="text-slate-300 italic mb-4">
            "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
          </p>
          <p className="font-bold text-white text-sm">- Malcolm X</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-4 sm:px-12 md:px-24 py-12 pt-24 lg:pt-12 overflow-y-auto relative">

        {/* Desktop Back Button */}
        <button
          onClick={() => onNavigate('home')}
          className="hidden lg:flex absolute top-8 right-8 items-center gap-2 text-slate-500 hover:text-brand-600 transition-colors font-medium"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div className="max-w-md mx-auto w-full">
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Log in to your account</h2>
            <p className="text-slate-600">
              Don't have an account?{' '}
              <button onClick={() => onNavigate('get-started')} className="text-brand-600 font-semibold hover:text-brand-700 hover:underline">
                Sign up
              </button>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Log in with Google
              </button>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase">Or continue with email</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => onNavigate('forgot-password')}
                    className="text-sm text-brand-600 hover:text-brand-700 font-medium hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-slate-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full text-base py-3"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
              {!isLoading && <ArrowRight size={18} className="ml-2" />}
            </Button>

            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                type="button"
                variant="ghost"
                className="w-full text-slate-500 hover:text-slate-800 text-xs"
                onClick={() => onNavigate('admin')}
              >
                <Shield size={14} className="mr-2" />
                Admin
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-slate-500 hover:text-slate-800 text-xs"
                onClick={() => onNavigate('instructor-dashboard')}
              >
                <GraduationCap size={14} className="mr-2" />
                Instructor
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-slate-500 hover:text-slate-800 text-xs"
                onClick={() => onNavigate('student')}
              >
                <User size={14} className="mr-2" />
                Student
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
