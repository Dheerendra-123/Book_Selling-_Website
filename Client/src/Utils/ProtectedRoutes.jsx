
import { Navigate } from 'react-router-dom';
import { handleError } from './Tostify';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');


  if (!token) {
    handleError("Session Expired Redirecting to Login");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
