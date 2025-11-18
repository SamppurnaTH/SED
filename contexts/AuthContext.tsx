
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { API_URL } from '../constants';

interface User {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<User | null>;
  register: (userData: Omit<User, 'password'>, pass: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateProfileImage: (url: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
        const userJson = localStorage.getItem('studentUser');
        const token = localStorage.getItem('studentToken');
        if (userJson && token) {
            return JSON.parse(userJson);
        }
        return null;
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        return null;
    }
  });

  const login = async (email: string, pass: string): Promise<User | null> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: pass }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      if (data.user.role !== 'student') {
          throw new Error('Invalid credentials for student login.');
      }
      
      const loggedInUser = { 
          name: data.user.name, 
          email: data.user.email,
          avatarUrl: data.user.avatarUrl 
      };
      localStorage.setItem('studentUser', JSON.stringify(loggedInUser));
      localStorage.setItem('studentToken', data.token);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error: any) {
      if (error.message && error.message.includes('Failed to fetch')) {
         throw new Error('Unable to connect to the server. Please ensure the backend is running.');
      }
      throw error;
    }
  };
  
  const register = async (userData: Omit<User, 'password'>, pass: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...userData, password: pass }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      const newUser = { 
          name: data.user.name, 
          email: data.user.email,
          avatarUrl: data.user.avatarUrl 
      };
      localStorage.setItem('studentUser', JSON.stringify(newUser));
      localStorage.setItem('studentToken', data.token);
      setUser(newUser);
    } catch (error: any) {
      if (error.message && error.message.includes('Failed to fetch')) {
         throw new Error('Unable to connect to the server. Please ensure the backend is running.');
      }
      throw error;
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
      const token = localStorage.getItem('studentToken');
      try {
        const response = await fetch(`${API_URL}/auth/update-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
      } catch (error: any) {
        if (error.message && error.message.includes('Failed to fetch')) {
           throw new Error('Unable to connect to the server.');
        }
        throw error;
      }
  };

  const updateProfileImage = async (url: string) => {
      if (!user) return;
      const token = localStorage.getItem('studentToken');
      try {
          const response = await fetch(`${API_URL}/user/profile-image`, {
              method: 'PUT',
              headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ avatarUrl: url })
          });
          if (!response.ok) throw new Error('Failed to update profile image');
          
          const updatedUser = { ...user, avatarUrl: url };
          setUser(updatedUser);
          localStorage.setItem('studentUser', JSON.stringify(updatedUser));
      } catch (error) {
          console.error(error);
          throw error;
      }
  };

  const logout = () => {
    localStorage.removeItem('studentUser');
    localStorage.removeItem('studentToken');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, updatePassword, updateProfileImage, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
