
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Course } from '../types';
import { courses as staticCourses, API_URL } from '../constants';

interface CoursesContextType {
  courses: Course[];
  getCourseBySlug: (slug: string) => Course | undefined;
  addCourse: (course: Course) => Promise<void>;
  updateCourse: (slug: string, updatedCourse: Course) => Promise<void>;
  deleteCourse: (slug: string) => Promise<void>;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
        try {
            const response = await fetch(`${API_URL}/courses`);
            if (!response.ok) throw new Error('Failed to fetch courses');
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.info("Using static course data (Backend offline).");
            setCourses(staticCourses);
        }
    };
    fetchCourses();
  }, []);

  const getCourseBySlug = (slug: string) => {
    return courses.find(c => c.slug === slug);
  };

  const addCourse = async (course: Course) => {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/courses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(course),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setCourses(prev => [...prev, data]);
    } catch (error: any) {
        alert(`Error adding course: ${error.message}`);
        throw error;
    }
  };

  const updateCourse = async (slug: string, updatedCourse: Course) => {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/courses/${slug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(updatedCourse),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setCourses(prev => prev.map(c => (c.slug === slug ? data : c)));
    } catch (error: any) {
        alert(`Error updating course: ${error.message}`);
        throw error;
    }
  };

  const deleteCourse = async (slug: string) => {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/courses/${slug}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        setCourses(prev => prev.filter(c => c.slug !== slug));
    } catch (error: any) {
        alert(`Error deleting course: ${error.message}`);
        throw error;
    }
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
