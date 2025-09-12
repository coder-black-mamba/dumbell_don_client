import React from 'react';
import { Link } from 'react-router';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import Logo from '../assets/logo_white.png';

const EmailVerified = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/">
            <img className="h-16 w-auto" src={Logo} alt="Dumbbell Don" />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
          Email Verified!
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-base-300 py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <FaCheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-100 mb-4">
            Your email has been successfully verified
          </h3>
          
          <div className="mt-2 text-sm text-gray-400 space-y-3">
            <p>
              Thank you for verifying your email address. Your account is now active and ready to use.
            </p>
            <p>
              You can now enjoy all the features of our platform.
            </p>
          </div>

          <div className="mt-8">
            <Link
              to="/login"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            >
              Continue to Login
              <FaArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-500">
              Having trouble?{' '}
              <Link to="/contact" className="text-brand hover:text-brand-dark">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerified;