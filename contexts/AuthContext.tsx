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
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<User | null>;
  register: (userData: Omit<User, 'password'>, pass: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateProfileImage: (url: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
        try {
            const response = await fetch(`${API_URL}/auth/me/student`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                if (data.user) {
                    setUser(data.user);
                }
            } else {
                console.error("Session check failed with status:", response.status);
            }
        } catch (error) {
            console.error("Session check failed", error);
        } finally {
            setIsLoading(false);
        }
    };
    checkUserSession();
  }, []);


  const login = async (email: string, pass: string): Promise<User | null> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-CSRF-Token': window.csrfToken || '',
          },
          body: JSON.stringify({ email, password: pass }),
          credentials: 'include',
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
      
      setUser(loggedInUser);
      localStorage.setItem('studentUser', JSON.stringify(loggedInUser));
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
          headers: { 
            'Content-Type': 'application/json',
            'X-CSRF-Token': window.csrfToken || '',
          },
          body: JSON.stringify({ ...userData, password: pass }),
          credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      const newUser = { 
          name: data.user.name, 
          email: data.user.email,
          avatarUrl: data.user.avatarUrl 
      };
      setUser(newUser);
      localStorage.setItem('studentUser', JSON.stringify(newUser));
    } catch (error: any) {
      if (error.message && error.message.includes('Failed to fetch')) {
         throw new Error('Unable to connect to the server. Please ensure the backend is running.');
      }
      throw error;
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
      try {
        const response = await fetch(`${API_URL}/auth/update-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': window.csrfToken || '',
            },
            body: JSON.stringify({ currentPassword, newPassword }),
            credentials: 'include',
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
      try {
          const response = await fetch(`${API_URL}/user/profile-image`, {
              method: 'PUT',
              headers: { 
                  'Content-Type': 'application/json',
                  'X-CSRF-Token': window.csrfToken || '',
              },
              body: JSON.stringify({ avatarUrl: url }),
              credentials: 'include',
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
    localStorage.removeItem('studentUser');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, updatePassword, updateProfileImage, logout }}>
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