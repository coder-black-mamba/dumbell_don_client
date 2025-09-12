import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaEnvelope, FaCheckCircle, FaRedo } from 'react-icons/fa';
import Logo from '../assets/logo_white.png';

const ActivationEmailSuccessfull = () => {
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState({
    success: false,
    message: ''
  });

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResendStatus({
        success: true,
        message: 'Activation email has been resent successfully!'
      });
    } catch (error) {
      setResendStatus({
        success: false,
        message: 'Failed to resend activation email. Please try again later.'
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/">
            <img className="h-16 w-auto" src={Logo} alt="Dumbbell Don" />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
          Check Your Email
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-base-300 py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <FaEnvelope className="h-8 w-8 text-green-600" />
          </div>
          
          <h3 className="text-lg leading-6 font-medium text-gray-100 mb-2">
            Activation Email Sent!
          </h3>
          
          <div className="mt-2 text-sm text-gray-400 space-y-4">
            <p>
              We've sent an activation link to your email address. Please check your inbox and click on the link to activate your account.
            </p>
            
            <div className="flex items-center justify-center text-sm text-gray-400">
              <FaCheckCircle className="flex-shrink-0 mr-2 h-4 w-4 text-green-500" />
              <p>Check your spam folder if you don't see the email</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleResendEmail}
              disabled={isResending || resendStatus.success}
              className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                resendStatus.success 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-brand hover:bg-brand-dark'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand`}
            >
              {isResending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : resendStatus.success ? (
                'Email Resent!'
              ) : (
                <>
                  <FaRedo className="mr-2" />
                  Resend Activation Email
                </>
              )}
            </button>
          </div>

          {resendStatus.message && (
            <div className={`mt-4 p-3 rounded-md ${
              resendStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {resendStatus.message}
            </div>
          )}

          <div className="mt-6 text-sm text-center">
            <p className="text-gray-400">
              Already activated your account?{' '}
              <Link to="/login" className="font-medium text-brand hover:text-brand-dark">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivationEmailSuccessfull;