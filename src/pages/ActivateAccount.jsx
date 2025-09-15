import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { FaCheckCircle, FaTimesCircle, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import { apiClient } from '../services/apiServices';
 
const ActivateAccount = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    loading: true,
    success: false,
    message: 'Activating your account...',
  });

  useEffect(() => {
    const activateAccount = async () => {
      if (!uid || !token) {
        setStatus({
          loading: false,
          success: false,
          message: 'Invalid activation link. Please check the link and try again.',
        });
        return;
      }

      try {
        // Call your backend API to activate the account
        await apiClient.post('auth/users/activation/', { uid, token });
        
        setStatus({
          loading: false,
          success: true,
          message: 'Your account has been successfully activated!',
        });

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: {
                text: 'Account activated successfully! You can now log in.',
                type: 'success'
              }
            } 
          });
        }, 3000);

      } catch (error) {
        console.error('Activation error:', error);
        setStatus({
          loading: false,
          success: false,
          message: error.response?.data?.detail || 'Failed to activate account. The link may be invalid or expired.',
        });
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-base-300 py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          {status.loading ? (
            <>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                <FaSpinner className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">Activating Account</h2>
              <p className="text-gray-300">{status.message}</p>
            </>
          ) : status.success ? (
            <>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <FaCheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">Account Activated!</h2>
              <p className="text-gray-300 mb-6">{status.message}</p>
              <p className="text-gray-400 text-sm">Redirecting to login page...</p>
            </>
          ) : (
            <>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <FaTimesCircle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">Activation Failed</h2>
              <p className="text-gray-300 mb-6">{status.message}</p>
              <div className="space-y-4">
                <Link
                  to="/signup"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
                >
                  Back to Sign Up
                </Link>
                <div className="text-sm">
                  <Link 
                    to="/login" 
                    className="font-medium text-brand hover:text-brand-dark inline-flex items-center"
                  >
                    <FaArrowLeft className="mr-1" />
                    Back to login
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivateAccount;