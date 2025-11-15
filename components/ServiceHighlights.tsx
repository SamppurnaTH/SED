import React from 'react';
import { courses } from '../constants';
import CourseCard from './CourseCard';

const ServiceHighlights: React.FC = () => {
  return (
    <section id="courses" className="py-20 lg:py-28 bg-light-gray">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-dark-gray">
            Industry-Focused Programs That Get You Job-Ready
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.name} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;