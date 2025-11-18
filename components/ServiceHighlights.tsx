
import React, { useState, useEffect, useRef } from 'react';
import { useCourses } from '../contexts/CoursesContext';
import CourseCard from './CourseCard';

const ServiceHighlights: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { courses } = useCourses();
  
  // Display up to 4 courses, handling potential empty state during loading
  const highlightCourses = courses && courses.length > 0 ? courses.slice(0, 4) : [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="courses" className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary">
            Industry-Focused Programs That Get You Job-Ready
          </h2>
        </div>
        <div ref={sectionRef} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlightCourses.map((course, index) => (
            <div
              key={course.name}
              className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CourseCard course={course} />
            </div>
          ))}
          {highlightCourses.length === 0 && (
             <div className="col-span-full text-center text-gray-500">
                 Loading featured courses...
             </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
