
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../constants';

interface AdminUser {
  email: string;
  role: 'admin' | 'marketing' | 'trainer';
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<AdminUser | null>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const userJson = localStorage.getItem('adminUser');
      const token = localStorage.getItem('adminToken');
      if (userJson && token) {
        return JSON.parse(userJson);
      }
      return null;
    } catch (error) {
      console.error("Could not access localStorage:", error);
      return null;
    }
  });

  const navigate = useNavigate();

  const login = async (email: string, pass: string): Promise<AdminUser | null> => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: pass }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        
        if (data.user.role === 'admin' || data.user.role === 'marketing' || data.user.role === 'trainer') {
            const userToStore: AdminUser = data.user;
            try {
                localStorage.setItem('adminUser', JSON.stringify(userToStore));
                localStorage.setItem('adminToken', data.token);
            } catch (error) {
                console.error("Could not write to localStorage:", error);
            }
            setAdminUser(userToStore);
            return userToStore;
        }

        throw new Error('This login is for administrators only.');
    } catch (error: any) {
        if (error.message && error.message.includes('Failed to fetch')) {
             throw new Error('Unable to connect to the server. Please ensure the backend is running.');
        }
        throw error;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('adminUser');
      localStorage.removeItem('adminToken');
    } catch (error) {
      console.error("Could not remove from localStorage:", error);
    }
    setAdminUser(null);
    navigate('/login');
  };

  const isAdminAuthenticated = !!adminUser;

  return (
    <AdminAuthContext.Provider value={{ adminUser, isAdminAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
