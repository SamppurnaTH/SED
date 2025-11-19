
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import PageLoader from './PageLoader';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'marketing' | 'trainer')[];
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAdminAuthenticated, adminUser, isLoading } = useAdminAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAdminAuthenticated) {
    // Redirect them to the /login page
    return <Navigate to="/login" replace />;
  }

  // Deny access if no roles are specified, or if the user's role is not in the allowed list.
  if (!allowedRoles || !adminUser || !allowedRoles.includes(adminUser.role)) {
    // User is authenticated but not authorized for this route.
    // Redirect to their respective dashboard as a safe fallback.
    const homeDashboard = adminUser?.role === 'trainer' ? '/trainer/dashboard' : '/admin/dashboard';
    return <Navigate to={homeDashboard || '/login'} replace />;
  }


  return <>{children}</>;
};

export default AdminProtectedRoute;