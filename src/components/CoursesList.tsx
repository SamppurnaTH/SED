import React, { useEffect, useCallback } from 'react';
import { useApi, useCourses } from '../hooks/useApi';

type Course = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  // Add other course properties as needed
};

const CoursesList: React.FC = () => {
  const { fetchCourses, deleteCourse: deleteCourseApi } = useCourses();
  
  const { 
    data: courses, 
    loading, 
    error, 
    execute: loadCourses 
  } = useApi<Course[]>(fetchCourses, []);

  const { 
    execute: deleteCourse, 
    loading: deleting 
  } = useApi(deleteCourseApi);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const handleDelete = useCallback(async (slug: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(slug);
        // Refresh the courses list after deletion
        loadCourses();
      } catch (error) {
        console.error('Failed to delete course:', error);
      }
    }
  }, [deleteCourse, loadCourses]);

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error loading courses: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.map((course) => (
          <div key={course._id} className="border rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="text-gray-600 mb-2">{course.description}</p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                  // Navigate to edit page or open edit modal
                  console.log('Edit course:', course.slug);
                }}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDelete(course.slug)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
