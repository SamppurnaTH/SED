
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo-1.png" 
        alt="SCHOLASTIC A EDU. DEPOT Logo" 
        className="h-10 w-auto md:h-12"
      />
      <span className="ml-3 text-xl font-bold text-white hidden sm:inline-block">
        SCHOLASTIC A EDU. DEPOT
      </span>
    </div>
  );
};

export default Logo;