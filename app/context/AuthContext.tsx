'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface User {
    id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
    isPremium: boolean;
    premiumExpiresAt?: string;
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const loadUser = async () => {
            const storedToken = localStorage.getItem('token');

            if (storedToken) {
                try {
                    // Verify token and get user data
                    const response = await axios.get(`${API_URL}/api/auth/me`, {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    });

                    if (response.data.success) {
                        setUser(response.data.data.user);
                        setToken(storedToken);
                    } else {
                        localStorage.removeItem('token');
                    }
                } catch (error) {
                    console.error('Error loading user:', error);
                    localStorage.removeItem('token');
                }
            }

            setLoading(false);
        };

        loadUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, {
                email,
                password
            });

            if (response.data.success) {
                const { token: newToken, user: userData } = response.data.data;
                setToken(newToken);
                setUser(userData);
                localStorage.setItem('token', newToken);
            } else {
                throw new Error(response.data.message || 'Login failed');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Login failed';
            throw new Error(errorMessage);
        }
    };

    const register = async (username: string, email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/register`, {
                username,
                email,
                password
            });

            if (response.data.success) {
                const { token: newToken, user: userData } = response.data.data;
                setToken(newToken);
                setUser(userData);
                localStorage.setItem('token', newToken);
            } else {
                throw new Error(response.data.message || 'Registration failed');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
            throw new Error(errorMessage);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    const value: AuthContextType = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
