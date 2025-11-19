


import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { useSavedCourses } from '../contexts/SavedCoursesContext';
import { BookmarkIcon } from './icons/BookmarkIcon';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const { toggleSaveCourse, isCourseSaved } = useSavedCourses();
  const saved = isCourseSaved(course.name);

  return (
    <div className="group bg-secondary rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 transform flex flex-col h-full relative overflow-hidden border border-primary/10">
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent transition-all duration-300 -z-10"></div>
      <div className="relative">
        <img
          src={course.imageUrl}
          alt={`Image for ${course.name} course`}
          className="w-full h-48 object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <button
          onClick={() => toggleSaveCourse(course.name)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 ${
            saved
              ? 'bg-accent/90 text-white scale-110 backdrop-blur-sm'
              : 'bg-secondary/80 text-primary hover:bg-secondary backdrop-blur-sm'
          }`}
          aria-label={
            saved
              ? `Remove ${course.name} from saved courses`
              : `Save ${course.name} for later`
          }
        >
          <BookmarkIcon className="w-6 h-6" isSaved={saved} />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="font-semibold text-accent text-sm">{course.category}</p>
        <h3 className="font-poppins font-bold text-xl mt-2 text-text-primary">{course.name}</h3>
        <ul className="mt-4 space-y-2 text-text-muted flex-grow">
          {course.points.map((point, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <Link 
          to={`/programs/${course.slug}`} 
          className="group/link mt-6 inline-flex items-center font-poppins font-bold text-primary self-start hover:text-accent transition-colors duration-300" 
          aria-label={`View details for ${course.name} program`}
        >
          <span className="group-hover/link:underline">View Program</span>
          <span className="ml-2 transition-transform duration-300 group-hover/link:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;