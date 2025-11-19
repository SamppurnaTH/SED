import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse border border-primary/5">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-6"></div>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
           <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
           <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
        <div className="h-5 bg-gray-300 rounded w-1/3 mt-8"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;