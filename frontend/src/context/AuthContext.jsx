import React, { createContext, useContext, useState, useEffect } from 'react';
import { endpoints, createApiClient } from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const apiClient = createApiClient(token);
                const response = await apiClient.get(endpoints.users.profile);
                setUser(response.user);
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    };

    const login = async (credentials) => {
        const apiClient = createApiClient();
        const response = await apiClient.post(endpoints.auth.login, credentials);
        if (response.token) {
            localStorage.setItem('token', response.token);
            setUser(response.user);
            return true;
        }
        return false;
    };

    const logout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const apiClient = createApiClient(token);
                await apiClient.post(endpoints.auth.logout);
            } catch (error) {
                console.error('Logout error:', error);
            }
        }
        localStorage.removeItem('token');
        setUser(null);
    };

    const register = async (userData) => {
        const apiClient = createApiClient();
        const response = await apiClient.post(endpoints.auth.register, userData);
        if (response.token) {
            localStorage.setItem('token', response.token);
            setUser(response.user);
            return true;
        }
        return false;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
