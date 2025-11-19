import React from 'react';
import CoursesList from '../components/CoursesList';

const CoursesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Courses</h1>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => {
            // Navigate to create course page or open create modal
            console.log('Create new course');
          }}
        >
          Add New Course
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <CoursesList />
      </div>
    </div>
  );
};

export default CoursesPage;
