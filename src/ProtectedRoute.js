import { useAuth } from "./auth/provider/AuthProvider";
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
  
    if (!token) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
};

export default ProtectedRoute;