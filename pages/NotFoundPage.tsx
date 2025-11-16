
import React from 'react';
import { Link } from 'react-router-dom';
import { NotFoundIcon } from '../components/icons/ErrorIcons';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-6 bg-white">
      <div className="text-center">
        <NotFoundIcon className="w-48 h-48 mx-auto text-primary opacity-80" />
        <h1 className="mt-8 text-4xl font-poppins font-bold text-dark-gray md:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="mt-4 text-lg text-dark-gray/80 max-w-lg mx-auto">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="bg-primary text-white font-poppins font-bold py-4 px-8 rounded-lg hover:scale-105 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
