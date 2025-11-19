import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../constants';

interface AdminUser {
  email: string;
  role: 'admin' | 'marketing' | 'trainer';
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<AdminUser | null>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminSession = async () => {
        try {
            // FIX: Corrected typo from API__URL to API_URL to ensure the fetch request targets the correct backend endpoint.
            const response = await fetch(`${API_URL}/auth/me/admin`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                if (data.user) {
                    setAdminUser(data.user);
                    localStorage.setItem('adminUser', JSON.stringify(data.user)); // Still useful for non-sensitive UI data
                } else {
                    localStorage.removeItem('adminUser');
                }
            } else {
                console.error("Admin session check failed with status:", response.status);
                localStorage.removeItem('adminUser');
            }
        } catch (error) {
            console.error("Admin session check failed", error);
            localStorage.removeItem('adminUser');
        } finally {
            setIsLoading(false);
        }
    };
    checkAdminSession();
  }, []);


  const login = async (email: string, pass: string): Promise<AdminUser | null> => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRF-Token': window.csrfToken || '',
            },
            body: JSON.stringify({ email, password: pass }),
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        
        if (data.user.role === 'admin' || data.user.role === 'marketing' || data.user.role === 'trainer') {
            const userToStore: AdminUser = data.user;
            try {
                localStorage.setItem('adminUser', JSON.stringify(userToStore));
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

  const logout = async () => {
    try {
        await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': window.csrfToken || '',
            },
            credentials: 'include',
        });
    } catch (error) {
        console.error("Logout API call failed", error);
    }
    try {
      localStorage.removeItem('adminUser');
    } catch (error) {
      console.error("Could not remove from localStorage:", error);
    }
    setAdminUser(null);
    navigate('/login');
  };

  const isAdminAuthenticated = !!adminUser;

  return (
    <AdminAuthContext.Provider value={{ adminUser, isAdminAuthenticated, isLoading, login, logout }}>
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