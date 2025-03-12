import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.adminAuth);
  const adminToken = localStorage.getItem('adminToken');

  if (!isAuthenticated || !adminToken) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default AdminRoute;
