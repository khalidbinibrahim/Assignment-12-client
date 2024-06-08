import { Navigate } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const isAdmin = useAdmin();

    if (!isAdmin) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default AdminRoute;