import { useState, useCallback } from 'react';
import { coursesApi } from '../../services/api';

type ApiFunction<T = any> = (...args: any[]) => Promise<T>;

export function useApi<T = any>(
  apiFunction: ApiFunction<T>,
  initialData: T | null = null
) {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { data, loading, error, execute };
}

// Example usage with courses API
export function useCourses() {
  const fetchCourses = useCallback(() => coursesApi.getAll(), []);
  const fetchCourseBySlug = useCallback((slug: string) => 
    coursesApi.getBySlug(slug), []);
  
  const createCourse = useCallback((courseData: any) => 
    coursesApi.create(courseData), []);
    
  const updateCourse = useCallback((slug: string, courseData: any) => 
    coursesApi.update(slug, courseData), []);
    
  const deleteCourse = useCallback((slug: string) => 
    coursesApi.delete(slug), []);

  return {
    fetchCourses,
    fetchCourseBySlug,
    createCourse,
    updateCourse,
    deleteCourse,
  };
}
