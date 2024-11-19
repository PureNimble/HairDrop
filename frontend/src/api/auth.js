import { apiClient } from './apiService';

export const login = async (email, password) => {
    try {
        const response = await apiClient.post('/login', { email, password });
        const token  = response.data;
        localStorage.setItem('token', token);
        return token;
    } catch (error) {
        console.error('Login error:', error.response || error.message);
        throw new Error('Invalid email or password.');
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    const storedToken = localStorage.getItem('token');
    return !!storedToken;
};

