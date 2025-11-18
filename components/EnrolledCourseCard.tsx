import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

interface EnrolledCourseCardProps {
  course: Course;
  progress: number;
}

const EnrolledCourseCard: React.FC<EnrolledCourseCardProps> = ({ course, progress }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform flex flex-col border border-gray-200 overflow-hidden">
      <img
        src={course.imageUrl}
        alt={`Image for ${course.name} course`}
        className="w-full h-40 object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-poppins font-bold text-xl text-dark-gray">{course.name}</h3>
        <p className="text-sm text-dark-gray/70 mt-1">with {course.instructor.name}</p>
        
        <div className="mt-4 flex-grow">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-dark-gray/60">Progress</span>
            <span className="text-xs font-bold text-primary">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <Link 
          to={`/learning/${course.slug}`} 
          className="w-full text-center mt-6 bg-primary text-white font-poppins font-bold py-2 px-4 rounded-lg hover:bg-accent transition-colors duration-300" 
          aria-label={`Continue learning ${course.name}`}
        >
          {progress === 0 ? 'Start Learning' : 'Continue Learning'}
        </Link>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;