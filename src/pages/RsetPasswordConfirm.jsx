import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate , useParams} from 'react-router';
import { useForm } from 'react-hook-form';
import { FaLock, FaArrowLeft, FaCheck, FaExclamationTriangle ,FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router';
import { apiClient } from '../services/apiServices';

const ResetPasswordConfirm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isValidLink, setIsValidLink] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
      register,
    handleSubmit,
    watch,
    formState: { errors , isSubmitting },
    trigger
  } = useForm({
    mode: 'onChange',
    defaultValues: {
        new_password: '',
        re_new_password: ''
    }
  });
  
  const newPassword = watch('new_password');
  const passwordRequirements = [
    { text: 'At least 8 characters', valid: newPassword?.length >= 8 },
    { text: 'At least one uppercase letter', valid: /[A-Z]/.test(newPassword || '') },
    { text: 'At least one number', valid: /[0-9]/.test(newPassword || '') },
    { text: 'At least one special character', valid: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword || '') },
  ];
  
  const isPasswordValid = passwordRequirements.every(req => req.valid);

  const { uid, token } = useParams();
  console.log(token ,uid);

  useEffect(() => {
    if (!token || !uid) {
      setIsValidLink(false);
      setMessage({
        text: 'Invalid or expired password reset link.',
        type: 'error',
      });
    }
  }, [token, uid]);

  const onSubmit = async (data) => {
    if (!isPasswordValid) {
      setMessage({
        text: 'Please ensure your password meets all requirements.',
        type: 'error',
      });
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      await apiClient.post('auth/users/reset_password_confirm/', {
        uid,
        token,
        new_password: data.new_password,
        re_new_password: data.re_new_password,
      });
      
      setShowSuccess(true);
      setMessage({
        text: 'Your password has been reset successfully!',
        type: 'success',
      });
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      console.error('Password reset error:', error);
      setMessage({
        text: error.response?.data?.detail || 'Failed to reset password. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidLink) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
            Invalid Reset Link
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-base-300 py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <FaExclamationTriangle className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-gray-300 mb-6">{message.text}</p>
            <Link
              to="/forgot-password"
              className="inline-flex items-center text-sm font-medium text-brand hover:text-brand-dark"
            >
              <FaArrowLeft className="mr-1" />
              Back to password reset
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
            Password Reset Successful!
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-base-300 py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <FaCheck className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-gray-300 mb-6">
              Your password has been successfully reset. Redirecting to login...
            </p>
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium text-brand hover:text-brand-dark"
            >
              Go to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
          Create New Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Please enter your new password below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-base-300 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {message.text && (
            <div 
              className={`mb-4 p-4 rounded-md ${
                message.type === 'error' 
                  ? 'bg-red-50 text-red-800' 
                  : 'bg-green-50 text-green-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="new_password" className="block text-sm font-medium text-gray-300">
                New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="new_password"
                  type="password"
                  className={`px-3 py-2 bg-base-200 text-white placeholder-gray-400 focus:ring-brand focus:border-brand block w-full pl-10 sm:text-sm border ${
                    errors.new_password ? 'border-red-500' : 'border-gray-600'
                  } rounded-md`}
                  placeholder="Enter new password"
                  {...register('new_password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                    validate: {
                      hasUppercase: (value) =>
                        /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                      hasNumber: (value) =>
                        /[0-9]/.test(value) || 'Password must contain at least one number',
                      hasSpecialChar: (value) =>
                        /[!@#$%^&*(),.?\":{}|<>]/.test(value) ||
                        'Password must contain at least one special character',
                    },
                  })}
                  onBlur={() => trigger('new_password')}
                />
              </div>
              {errors.new_password && (
                <p className="mt-1 text-sm text-red-500">{errors.new_password.message}</p>
              )}
              
              {/* Password requirements */}
              <div className="mt-2 text-xs text-gray-400">
                <p className="font-medium mb-1">Password must contain:</p>
                <ul className="space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <li 
                      key={index} 
                      className={`flex items-center ${req.valid ? 'text-green-400' : ''}`}
                    >
                      {req.valid ? (
                        <FaCheck className="h-3 w-3 mr-1 text-green-400" />
                      ) : (
                        <span className="inline-block w-3 h-3 mr-1 rounded-full border border-gray-500"></span>
                      )}
                      {req.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <label htmlFor="re_new_password" className="block text-sm font-medium text-gray-300">
                Confirm New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="re_new_password"
                  type="password"
                  className={`px-3 py-2 bg-base-200 text-white placeholder-gray-400 focus:ring-brand focus:border-brand block w-full pl-10 sm:text-sm border ${
                    errors.re_new_password ? 'border-red-500' : 'border-gray-600'
                  } rounded-md`}
                  placeholder="Confirm new password"
                  {...register('re_new_password', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === newPassword || 'Passwords do not match',
                  })}
                  onBlur={() => trigger('re_new_password')}
                />
              </div>
              {errors.re_new_password && (
                <p className="mt-1 text-sm text-red-500">{errors.re_new_password.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || !isPasswordValid}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2 text-white fw-bold text-lg" />
                    Resetting Password...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium text-brand hover:text-brand-dark"
            >
              <FaArrowLeft className="mr-1" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;