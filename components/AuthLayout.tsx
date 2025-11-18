
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './icons/Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Branding Panel */}
      <div 
        className="hidden md:flex md:w-1/2 lg:w-[60%] bg-cover bg-center relative items-center justify-center p-12 text-secondary"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-primary/80"></div>
        <div className="relative z-10 text-center">
            <Link to="/" className="inline-block" aria-label="Go to homepage">
                <Logo className="h-24 w-24 mx-auto" />
            </Link>
            <h1 className="font-poppins font-bold text-4xl mt-6">
                Welcome to SED Tech Academy
            </h1>
            <p className="mt-4 text-secondary max-w-sm mx-auto">
                Real skills. Real projects. Real placements. Your tech career starts here.
            </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full md:w-1/2 lg:w-[40%] bg-secondary flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
            {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
