import { Outlet, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectTo: string;
}

const ProtectedRoute = ({ isAllowed, redirectTo }: ProtectedRouteProps) => {
  return isAllowed ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
