import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!isAuthenticated) {
    // Redirect to login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the user has the required role
  if (roles.length > 0 && !roles.includes(user?.role)) {
    // Redirect to unauthorized or dashboard based on user role
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export const AdminRoute = ({ children }) => (
  <ProtectedRoute roles={['admin']}>
    {children}
  </ProtectedRoute>
);

export const StaffRoute = ({ children }) => (
  <ProtectedRoute roles={['staff']}>
    {children}
  </ProtectedRoute>
);

export const MemberRoute = ({ children }) => (
  <ProtectedRoute roles={['member']}>
    {children}
  </ProtectedRoute>
);
