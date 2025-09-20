import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, loading, user } = useAuth();
  // const user =JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  // console.log("Protected Routes")
  // console.log(isAuthenticated)
  // console.log(user)
  // console.log(roles)
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
  <ProtectedRoute roles={['ADMIN']}>
    {children}
  </ProtectedRoute>
);

export const StaffRoute = ({ children }) => (
  <ProtectedRoute roles={['STAFF']}>
    {children}
  </ProtectedRoute>
);

export const MemberRoute = ({ children }) => (
  <ProtectedRoute roles={['MEMBER']}>
    {children}
  </ProtectedRoute>
);

export const AuthenticatedRoute = ({ children }) => (
  <ProtectedRoute>
    {children}
  </ProtectedRoute>
);