

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const ProtectedRoute = ({ children, role }) => {
    const { user } = useContext(UserContext);

    console.log('User:', user); 

    if (!user || user.role !== role) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
