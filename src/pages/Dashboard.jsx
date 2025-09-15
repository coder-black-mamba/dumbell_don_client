import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';


const Dashboard = () => {
  const { user, isAdmin, isStaff } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // If user is not authenticated, redirect to login
      navigate('/login');
      return;
    }

    // Redirect based on user role
    if (isAdmin) {
      navigate('/admin/dashboard');
    } else if (isStaff) {
      navigate('/staff/dashboard');
    } else {
      // Regular member
      navigate('/user/dashboard');
    }
  }, [user, isAdmin, isStaff, navigate]);

  // Show loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <p className="text-gray-600 text-xl text-center mt-4">Loading...</p>
    </div>
  );
};

export default Dashboard;