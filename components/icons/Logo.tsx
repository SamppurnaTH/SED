
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none">
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" className="text-primary" />
      <path d="M10 50 A40 40 0 0 1 90 50" stroke="currentColor" strokeWidth="1.5" className="text-primary/70" />
      <path d="M10 50 A40 40 0 0 0 90 50" stroke="currentColor" strokeWidth="1.5" className="text-primary/70" />
      <path d="M50 10 A40 40 0 0 1 50 90" stroke="currentColor" strokeWidth="1.5" className="text-primary/70" />
      <path d="M50 10 A40 40 0 0 0 50 90" stroke="currentColor" strokeWidth="1.5" className="text-primary/70" />
      <path d="M25 25 L75 75" stroke="currentColor" strokeWidth="1" className="text-primary/30" />
      <path d="M25 75 L75 25" stroke="currentColor" strokeWidth="1" className="text-primary/30" />
      <text
        x="50"
        y="58"
        fontFamily="Poppins, sans-serif"
        fontSize="32"
        fontWeight="bold"
        textAnchor="middle"
        className="fill-current text-primary"
      >
        SED
      </text>
    </svg>
  );
};

export default Logo;
