
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { API_URL } from '../constants';

interface SavedCoursesContextType {
  savedCourses: string[];
  toggleSaveCourse: (courseName: string) => void;
  isCourseSaved: (courseName: string) => boolean;
}

const SavedCoursesContext = createContext<SavedCoursesContextType | undefined>(undefined);

export const SavedCoursesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedCourses, setSavedCourses] = useState<string[]>([]);
  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchSavedCourses = async () => {
      if (!user) {
        setSavedCourses([]);
        return;
      }
      try {
        const token = localStorage.getItem('studentToken');
        const response = await fetch(`${API_URL}/user/saved-courses`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch saved courses');
        const data = await response.json();
        setSavedCourses(data);
      } catch (error) {
        console.info("Backend offline: Unable to fetch saved courses.");
        setSavedCourses([]);
      }
    };
    fetchSavedCourses();
  }, [user]);


  const toggleSaveCourse = async (courseName: string) => {
    if (!user) {
      addToast('Please log in to save courses.', 'info');
      return;
    }
    const isCurrentlySaved = savedCourses.includes(courseName);

    // Optimistic UI update
    setSavedCourses(prev =>
      isCurrentlySaved
        ? prev.filter(name => name !== courseName)
        : [...prev, courseName]
    );

    try {
      const token = localStorage.getItem('studentToken');
      const response = await fetch(`${API_URL}/user/saved-courses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ courseName }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      // Sync with server state and show toast
      setSavedCourses(data);
      
      if (isCurrentlySaved) {
          addToast(`Removed ${courseName} from saved courses.`, 'info');
      } else {
          addToast(`${courseName} saved successfully!`, 'success');
      }
      
    } catch (error) {
      console.error('Failed to toggle saved course:', error);
      // Revert optimistic update on failure
      setSavedCourses(prev =>
        isCurrentlySaved
          ? [...prev, courseName]
          : prev.filter(name => name !== courseName)
      );
      addToast('Could not update saved courses. Please try again.', 'error');
    }
  };
  
  const isCourseSaved = (courseName: string) => {
      return savedCourses.includes(courseName);
  }

  return (
    <SavedCoursesContext.Provider value={{ savedCourses, toggleSaveCourse, isCourseSaved }}>
      {children}
    </SavedCoursesContext.Provider>
  );
};

export const useSavedCourses = () => {
  const context = useContext(SavedCoursesContext);
  if (context === undefined) {
    throw new Error('useSavedCourses must be used within a SavedCoursesProvider');
  }
  return context;
};
