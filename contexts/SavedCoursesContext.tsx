
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface SavedCoursesContextType {
  savedCourses: string[];
  toggleSaveCourse: (courseName: string) => void;
  isCourseSaved: (courseName: string) => boolean;
}

const SavedCoursesContext = createContext<SavedCoursesContextType | undefined>(undefined);

export const SavedCoursesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedCourses, setSavedCourses] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('savedCourses');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse saved courses from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
        localStorage.setItem('savedCourses', JSON.stringify(savedCourses));
    } catch (error) {
        console.error("Failed to save courses to localStorage", error);
    }
  }, [savedCourses]);

  const toggleSaveCourse = (courseName: string) => {
    setSavedCourses(prev =>
      prev.includes(courseName)
        ? prev.filter(name => name !== courseName)
        : [...prev, courseName]
    );
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