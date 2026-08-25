import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();

  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem('blindcode_admin_token') || null;
  });

  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('blindcode_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    try {
      const data = await api.adminLogin(email, password);
      if (data.success && data.token) {
        setAdminToken(data.token);
        setAdminUser(data.admin);
        localStorage.setItem('blindcode_admin_token', data.token);
        localStorage.setItem('blindcode_admin_user', JSON.stringify(data.admin));
        addToast('Admin logged in successfully.', 'success', 3000);
        return { success: true };
      } else {
        addToast(data.message || 'Invalid credentials.', 'error', 4000);
        return { success: false, message: data.message };
      }
    } catch (err) {
      addToast('Network error during admin login.', 'error', 4000);
      return { success: false, message: 'Server communication error.' };
    }
  };

  const logout = () => {
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem('blindcode_admin_token');
    localStorage.removeItem('blindcode_admin_user');
    addToast('Admin signed out.', 'info', 2500);
  };

  const isAuthenticated = Boolean(adminToken);

  return (
    <AuthContext.Provider value={{ adminToken, adminUser, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
