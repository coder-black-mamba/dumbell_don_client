import React from 'react';
import { Link, useNavigate } from 'react-router';
import { FaLock, FaHome, FaArrowLeft } from 'react-icons/fa';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <FaLock className="text-red-500 text-4xl" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page. Please contact the administrator if you believe this is a mistake.
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
            <FaHome /> Go to Home
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <Link to="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;