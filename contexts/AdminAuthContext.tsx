
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('isAdminAuthenticated') === 'true';
    } catch (error) {
      console.error("Could not access localStorage:", error);
      return false;
    }
  });

  const navigate = useNavigate();

  // Hardcoded credentials for demo purposes
  const ADMIN_EMAIL = 'admin@sed.com';
  const ADMIN_PASSWORD = 'adminpassword123';

  const login = async (email: string, pass: string): Promise<boolean> => {
    // Simulate network delay to feel like a real backend call
    await new Promise(resolve => setTimeout(resolve, 500));

    if (email.toLowerCase() === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {
      try {
        localStorage.setItem('isAdminAuthenticated', 'true');
      } catch (error) {
        console.error("Could not write to localStorage:", error);
      }
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    try {
      localStorage.removeItem('isAdminAuthenticated');
    } catch (error) {
      console.error("Could not remove from localStorage:", error);
    }
    setIsAdminAuthenticated(false);
    navigate('/login');
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, login, logout }}>
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
