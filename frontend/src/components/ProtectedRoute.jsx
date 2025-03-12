import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PublicRoute = ({ children }) => {
  const { isAuthenticated: isUserAuthenticated } = useSelector(state => state.auth);
  const { isAuthenticated: isAdminAuthenticated } = useSelector(state => state.adminAuth);

  // If admin is authenticated, redirect to admin orders page
  if (isAdminAuthenticated) {
    return <Navigate to="/admin/orders" />;
  }

  // If regular user is authenticated, redirect to home
  if (isUserAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const AdminRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const { isAdmin } = useSelector(state => state.auth.user || {});
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;
  
  return children;
};
