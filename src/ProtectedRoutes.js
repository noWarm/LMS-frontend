import { useContext } from 'react';
import { Navigate} from 'react-router-dom';
import { AppContext } from './AppProvider';

const ProtectedRoutes = ({ children }) => {
    const { 
        ["token"] : [token, setToken],
        ["username"] : [username, setUsername],
      } = useContext(AppContext);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoutes;