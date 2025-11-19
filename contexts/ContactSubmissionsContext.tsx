
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ContactSubmission } from '../types';
import { useAdminAuth } from './AdminAuthContext';
import { API_URL } from '../constants';

interface ContactSubmissionsContextType {
  submissions: ContactSubmission[];
}

const ContactSubmissionsContext = createContext<ContactSubmissionsContextType | undefined>(undefined);

export const ContactSubmissionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const { isAdminAuthenticated } = useAdminAuth();

  useEffect(() => {
    const fetchSubmissions = async () => {
        if (!isAdminAuthenticated) {
            setSubmissions([]);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/submissions`, {
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to fetch submissions');
            const data = await response.json();
            setSubmissions(data);
        } catch (error) {
            console.info("Backend offline: Unable to fetch submissions.");
            setSubmissions([]);
        }
    };

    fetchSubmissions();
  }, [isAdminAuthenticated]);
  
  return (
    <ContactSubmissionsContext.Provider value={{ submissions }}>
      {children}
    </ContactSubmissionsContext.Provider>
  );
};

export const useContactSubmissions = () => {
  const context = useContext(ContactSubmissionsContext);
  if (context === undefined) {
    throw new Error('useContactSubmissions must be used within a ContactSubmissionsProvider');
  }
  return context;
};