import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-secondary">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default PageLoader;
