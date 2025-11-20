import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, api } from '../services/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    acceptTerms: boolean;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; message: string }>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('student_session_token');
        if (token) {
          const userData = await authApi.getCurrentUser();
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        localStorage.removeItem('student_session_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const response = await authApi.login({ email, password });
      
      if (response.user) {
        setUser(response.user);
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed. Please check your credentials.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    acceptTerms: boolean;
  }) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const response = await authApi.register(userData);
      
      if (response.user) {
        setUser(response.user);
        return { success: true };
      }
      
      return { 
        success: false, 
        error: response.message || 'Registration failed. Please try again.' 
      };
    } catch (error: any) {
      console.error('Registration failed:', error);
      setError(error.message || 'Registration failed. Please try again.');
      return { 
        success: false, 
        error: error.message || 'Registration failed. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      navigate('/login');
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!user) throw new Error('Not authenticated');
      
      // Optimistic update
      setUser(prev => prev ? { ...prev, ...updates } : null);
      
      // API call
      const response = await api.courses.update(user._id, updates);
      
      return response;
    } catch (error) {
      console.error('Profile update failed:', error);
      // Revert optimistic update on error
      if (user) {
        const freshData = await authApi.getCurrentUser();
        setUser(freshData);
      }
      throw error;
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      setError(null);
      await authApi.requestPasswordReset(email);
      return { 
        success: true, 
        message: 'Password reset link has been sent to your email.' 
      };
    } catch (error: any) {
      console.error('Password reset request failed:', error);
      setError(error.message || 'Failed to send password reset email.');
      return { 
        success: false, 
        message: error.message || 'Failed to send password reset email.' 
      };
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      setError(null);
      await authApi.resetPassword(token, password);
      return { 
        success: true, 
        message: 'Password has been reset successfully.' 
      };
    } catch (error: any) {
      console.error('Password reset failed:', error);
      setError(error.message || 'Failed to reset password.');
      return { 
        success: false, 
        message: error.message || 'Failed to reset password.' 
      };
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    requestPasswordReset,
    resetPassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};