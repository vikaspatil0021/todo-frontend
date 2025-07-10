import { useEffect, useState } from 'react';

import API from '../config/axios';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        API.get('/api/auth/me')
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false));
    }, []);

    return { isAuthenticated };
};

export default useAuth;
