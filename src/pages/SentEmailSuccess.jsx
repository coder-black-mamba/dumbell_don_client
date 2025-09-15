import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FaCheckCircle, FaEnvelope, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router';
import { apiClient } from '../services/apiServices';

const SentEmailSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState({ success: false, message: '' });
  
  // Get email from location state or default to a placeholder
  const email = location.state?.email || 'your email';

  const handleResendEmail = async () => {
    if (!email || email === 'your email') {
      setResendStatus({
        success: false,
        message: 'No email address found to resend to.'
      });
      return;
    }

    setIsResending(true);
    setResendStatus({ success: false, message: '' });

    try {
      // Replace with your actual API endpoint for resending verification email
      await apiClient.post('auth/users/resend_activation/', { email });
      
      setResendStatus({
        success: true,
        message: 'Verification email has been resent successfully!'
      });
    } catch (error) {
      console.error('Error resending email:', error);
      setResendStatus({
        success: false,
        message: error.response?.data?.detail || 'Failed to resend verification email. Please try again.'
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <FaCheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
            Check Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            We've sent a verification link to <span className="font-medium text-white">{email}</span>
          </p>
        </div>

        <div className="mt-8 bg-base-300 py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <div className="flex items-center justify-center mb-4">
            <FaEnvelope className="h-12 w-12 text-gray-400" />
          </div>
          
          <p className="text-gray-300 mb-6">
            Please check your email and click on the verification link to activate your account.
            If you don't see the email, please check your spam folder.
          </p>

          {resendStatus.message && (
            <div className={`mb-4 p-3 rounded-md text-sm ${
              resendStatus.success 
                ? 'bg-green-50 text-green-800' 
                : 'bg-red-50 text-red-800'
            }`}>
              {resendStatus.message}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <button
              onClick={handleResendEmail}
              disabled={isResending}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                'Resend Verification Email'
              )}
            </button>

            <div className="text-sm mt-4">
              <Link 
                to="/login" 
                className="font-medium text-brand hover:text-brand-dark inline-flex items-center"
              >
                <FaArrowLeft className="mr-1" />
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentEmailSuccess;