
import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { useSavedCourses } from '../contexts/SavedCoursesContext';
import { BookmarkIcon } from './icons/BookmarkIcon';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const { toggleSaveCourse, isCourseSaved } = useSavedCourses();
  const saved = isCourseSaved(course.name);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 transform flex flex-col border border-gray-100 relative overflow-hidden">
      <div className="relative">
        <img
          src={course.imageUrl}
          alt={`Image for ${course.name} course`}
          className="w-full h-48 object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <button
          onClick={() => toggleSaveCourse(course.name)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 ${
            saved
              ? 'bg-primary/80 text-white scale-110 backdrop-blur-sm'
              : 'bg-white/80 text-gray-600 hover:bg-white backdrop-blur-sm'
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
        <p className="font-semibold text-primary text-sm">{course.category}</p>
        <h3 className="font-poppins font-bold text-xl mt-2 text-dark-gray">{course.name}</h3>
        <ul className="mt-4 space-y-2 text-dark-gray/80 flex-grow">
          {course.points.map((point, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <Link to={`/programs/${course.slug}`} className="mt-6 font-poppins font-bold text-primary self-start hover:underline" aria-label={`View details for ${course.name} program`}>
          View Program &rarr;
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;