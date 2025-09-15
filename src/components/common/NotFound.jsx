import React from 'react';
import { Link, useNavigate } from 'react-router';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-100 p-4 rounded-full">
            <FaExclamationTriangle className="text-yellow-500 text-4xl" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-primary flex items-center justify-center gap-2"
          >
            <FaArrowLeft /> Go Back
          </button>
          
          <Link 
            to="/" 
            className="btn btn-primary flex items-center justify-center gap-2"
          >
            <FaHome /> Return Home
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Can't find what you're looking for?{' '}
            <Link to="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;