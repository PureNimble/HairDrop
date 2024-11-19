import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../api/auth';

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
