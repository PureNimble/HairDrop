import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
