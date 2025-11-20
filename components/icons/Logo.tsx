
import React from 'react';
import { useLocation } from 'react-router-dom';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ className = '', variant }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Determine if we should use light or dark variant based on props or current route
  const useLightVariant = variant === 'light' || (variant === undefined && isHomePage);
  
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo-1.png" 
        alt="SCHOLASTIC A EDU. DEPOT Logo" 
        className="h-10 w-auto md:h-12"
      />
      <span className={`ml-3 text-xl font-bold hidden sm:inline-block ${
        useLightVariant 
          ? 'text-white' 
          : 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'
      }`}>
        SCHOLASTIC A EDU. DEPOT
      </span>
    </div>
  );
};

export default Logo;