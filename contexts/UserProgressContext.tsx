import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { EnrolledCourseInfo } from '../types';
import { API_URL } from '../constants';

interface UserProgressContextType {
  enrolledCourses: EnrolledCourseInfo[];
  enrollInCourse: (courseSlug: string) => void;
  getCourseProgress: (courseSlug: string) => number;
  markLessonComplete: (courseSlug: string, lessonId: string) => Promise<void>;
  isLessonCompleted: (courseSlug: string, lessonId: string) => boolean;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export const UserProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourseInfo[]>([]);

  useEffect(() => {
    const fetchProgress = async () => {
        if (!user) {
            setEnrolledCourses([]);
            return;
        }
        try {
            const response = await fetch(`${API_URL}/user/progress`, {
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to fetch progress');
            const data = await response.json();
            setEnrolledCourses(data);
        } catch (error) {
            console.info("Backend offline: Unable to fetch user progress.");
            setEnrolledCourses([]); // Ensure state is clean
        }
    };
    fetchProgress();
  }, [user]);

  const enrollInCourse = async (courseSlug: string) => {
    if (!user) return;
    if (!enrolledCourses.some(c => c.courseSlug === courseSlug)) {
      try {
        const response = await fetch(`${API_URL}/user/progress/enroll`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ courseSlug }),
            credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setEnrolledCourses(data);
      } catch (error) {
        console.error("Failed to enroll in course:", error);
        alert('There was an error enrolling in the course. Please try again later.');
      }
    }
  };

  const markLessonComplete = async (courseSlug: string, lessonId: string) => {
    if (!user) return;
    try {
        const response = await fetch(`${API_URL}/user/progress/complete-lesson`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ courseSlug, lessonId }),
            credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setEnrolledCourses(data);
    } catch (error) {
        console.error("Failed to update progress:", error);
    }
  };

  const getCourseProgress = (courseSlug: string) => {
    return enrolledCourses.find(c => c.courseSlug === courseSlug)?.progress ?? 0;
  };

  const isLessonCompleted = (courseSlug: string, lessonId: string) => {
      const course = enrolledCourses.find(c => c.courseSlug === courseSlug);
      return course?.completedLessons?.includes(lessonId) || false;
  };

  return (
    <UserProgressContext.Provider value={{ enrolledCourses, enrollInCourse, getCourseProgress, markLessonComplete, isLessonCompleted }}>
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};