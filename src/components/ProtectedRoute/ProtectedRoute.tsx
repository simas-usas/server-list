import { useAuth } from '#contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedRoute;
