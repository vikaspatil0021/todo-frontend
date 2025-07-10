import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';


const AuthLayout = () => {
    const { isAuthenticated } = useAuth();

    const location = useLocation();
    const path = location.pathname;

    const authRoutes = ['/login', '/register'];

    if (isAuthenticated && authRoutes.includes(path)) {
        return <Navigate to="/board" replace />;
    }

    if (!isAuthenticated && !authRoutes.includes(path)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default AuthLayout;
