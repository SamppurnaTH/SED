

import React, { useState, useEffect, useRef } from 'react';
import { useCourses } from '../contexts/CoursesContext';
import CourseCard from './CourseCard';
import SkeletonCard from './skeletons/SkeletonCard';

const ServiceHighlights: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { courses, isLoading } = useCourses();
  
  const highlightCourses = courses.slice(0, 4);

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
  }, [isLoading]); // Rerun observer logic if loading state changes

  return (
    <section id="courses" className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary">
            Industry-Focused Programs That Get You Job-Ready
          </h2>
        </div>
        <div ref={sectionRef} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
             [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <SkeletonCard />
                </div>
             ))
          ) : (
            highlightCourses.map((course, index) => (
              <div
                key={course.slug}
                className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CourseCard course={course} />
              </div>
            ))
          )}
          {!isLoading && highlightCourses.length === 0 && (
             <div className="col-span-full text-center text-gray-500">
                 No featured courses available at the moment.
             </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;