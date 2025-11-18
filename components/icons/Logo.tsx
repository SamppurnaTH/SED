
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  // Using an img tag to render the provided PNG logo.
  // The 'logo.png' file should be placed in the `public` directory.
  return (
    <img src="/logo.png" alt="SCHOLASTIC A EDU. DEPOT Logo" className={className} />
  );
};

export default Logo;