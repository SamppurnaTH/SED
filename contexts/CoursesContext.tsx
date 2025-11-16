import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Course } from '../types';
import { courses as initialCourses } from '../constants';

interface CoursesContextType {
  courses: Course[];
  getCourseBySlug: (slug: string) => Course | undefined;
  addCourse: (course: Course) => void;
  updateCourse: (slug: string, updatedCourse: Course) => void;
  deleteCourse: (slug: string) => void;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  const getCourseBySlug = (slug: string) => {
    return courses.find(c => c.slug === slug);
  };

  const addCourse = (course: Course) => {
    if (courses.some(c => c.slug === course.slug)) {
        alert('Error: A course with this slug already exists.');
        return;
    }
    setCourses(prev => [...prev, course]);
  };

  const updateCourse = (slug: string, updatedCourse: Course) => {
    setCourses(prev => prev.map(c => (c.slug === slug ? updatedCourse : c)));
  };

  const deleteCourse = (slug: string) => {
    setCourses(prev => prev.filter(c => c.slug !== slug));
  };


  return (
    <CoursesContext.Provider value={{ courses, getCourseBySlug, addCourse, updateCourse, deleteCourse }}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
};