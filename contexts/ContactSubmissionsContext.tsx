
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ContactSubmission } from '../types';

interface ContactSubmissionsContextType {
  submissions: ContactSubmission[];
  addSubmission: (submission: Omit<ContactSubmission, 'id' | 'submittedAt'>) => void;
}

const ContactSubmissionsContext = createContext<ContactSubmissionsContextType | undefined>(undefined);

export const ContactSubmissionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('contactSubmissions');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse submissions from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    } catch (error) {
        console.error("Failed to save submissions to localStorage", error);
    }
  }, [submissions]);

  const addSubmission = (submission: Omit<ContactSubmission, 'id' | 'submittedAt'>) => {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: new Date().getTime().toString(),
      submittedAt: new Date().toISOString(),
    };
    setSubmissions(prev => [newSubmission, ...prev]);
  };

  return (
    <ContactSubmissionsContext.Provider value={{ submissions, addSubmission }}>
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
