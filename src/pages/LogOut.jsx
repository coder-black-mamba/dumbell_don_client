import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const LogOut = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        navigate('/login', { replace: true });
      } catch (error) {
        console.error('Logout failed:', error);
        navigate('/');
      }
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
        <h2 className="text-2xl font-semibold text-gray-800">Logging you out...</h2>
        <p className="mt-2 text-gray-600">Please wait while we securely log you out.</p>
      </div>
    </div>
  );
};

export default LogOut;