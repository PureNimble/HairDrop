import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../api/auth';

const PublicRoute = ({ children }) => {
    return isAuthenticated() ? <Navigate to="/home" /> : children;
};

export default PublicRoute;
