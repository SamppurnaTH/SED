
import React, { useState } from 'react';
import { courses, courseCategories } from '../constants';
import CourseCard from '../components/CourseCard';
import CTA from '../components/CTA';
import { useSavedCourses } from '../contexts/SavedCoursesContext';

const ProgramsPage: React.FC = () => {
  const { savedCourses, isCourseSaved } = useSavedCourses();
  const [showSaved, setShowSaved] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };
  
  const filteredByCategory = selectedCategory === 'All' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const filteredCourses = showSaved 
    ? filteredByCategory.filter(course => isCourseSaved(course.name)) 
    : filteredByCategory;

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-light-gray to-white pt-32 pb-20 lg:pt-48 lg:pb-28 text-center overflow-hidden">
        <div className="absolute top-0 left-0 -z-0 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 bg-gradient-to-br from-primary to-secondary rounded-full opacity-10 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 z-10">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-dark-gray leading-tight">
            Our Programs
          </h1>
          <p className="mt-6 text-lg md:text-xl text-dark-gray/80 max-w-3xl mx-auto">
            Explore our industry-focused programs designed to equip you with the most in-demand skills and launch your career in tech.
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section id="programs-list" className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-dark-gray text-center mb-8">
                Find Your Program
            </h2>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {courseCategories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`font-poppins font-semibold py-2 px-5 rounded-full border-2 transition-all duration-300 text-sm md:text-base ${
                    selectedCategory === category
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-transparent text-dark-gray border-gray-300 hover:bg-primary/10 hover:border-primary/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h3 className="font-poppins font-semibold text-2xl text-dark-gray text-center md:text-left mb-4 md:mb-0">
              {showSaved ? 'Your Saved Programs' : 'All Programs'}
              <span className="text-lg text-primary ml-2">({filteredCourses.length})</span>
            </h3>
            {savedCourses.length > 0 && (
              <button
                onClick={() => setShowSaved(!showSaved)}
                className={`font-poppins font-semibold py-2 px-6 rounded-lg border-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  showSaved 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-transparent text-primary border-primary hover:bg-primary/10'
                }`}
              >
                {showSaved ? 'Show All' : `View Saved (${savedCourses.length})`}
              </button>
            )}
          </div>
          
          {filteredCourses.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course.name} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-light-gray rounded-2xl">
                <h3 className="font-poppins font-bold text-2xl text-dark-gray">
                  {showSaved ? 'No Saved Courses in this Category' : 'No Courses Found'}
                </h3>
                <p className="mt-2 text-dark-gray/80">
                  {showSaved 
                    ? 'Try viewing all programs or a different category.' 
                    : 'Please select another category.'}
                </p>
                 {!showSaved && savedCourses.length === 0 && (
                    <p className="mt-1 text-dark-gray/80">Click the bookmark icon on any course to save it for later!</p>
                 )}
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
};

export default ProgramsPage;