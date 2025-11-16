
import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorIcon } from '../components/icons/ErrorIcons';

interface ErrorPageProps {
  onRetry?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ onRetry }) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-6 bg-white">
      <div className="text-center">
        <ErrorIcon className="w-40 h-40 mx-auto text-red-500 opacity-80" />
        <h1 className="mt-8 text-4xl font-poppins font-bold text-dark-gray md:text-5xl">
          Oops! Something Went Wrong
        </h1>
        <p className="mt-4 text-lg text-dark-gray/80 max-w-lg mx-auto">
          We're sorry, but an unexpected error occurred. Please try again or return to the homepage.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleRetry}
            className="bg-primary text-white font-poppins font-bold py-4 px-8 rounded-lg hover:scale-105 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform"
          >
            Try Again
          </button>
          <Link
            to="/"
            className="bg-transparent border-2 border-dark-gray text-dark-gray font-poppins font-bold py-4 px-8 rounded-lg hover:bg-dark-gray hover:text-white hover:scale-105 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
