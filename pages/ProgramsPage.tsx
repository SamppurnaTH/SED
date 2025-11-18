
import React, { useState, useEffect, useRef } from 'react';
import { useCourses } from '../contexts/CoursesContext';
import CourseCard from '../components/CourseCard';
import CTA from '../components/CTA';
import { useSavedCourses } from '../contexts/SavedCoursesContext';
import MetaTags from '../components/MetaTags';

const ProgramsPage: React.FC = () => {
  const { courses } = useCourses();
  const { savedCourses, isCourseSaved } = useSavedCourses();
  const [showSaved, setShowSaved] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Dynamically derive categories from the fetched courses
  const courseCategories = ['All', ...Array.from(new Set(courses.map(c => c.category)))];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = gridRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };
  
  // Filter and Sort Logic
  const filteredCourses = courses
    .filter(course => {
      const categoryMatch = selectedCategory === 'All' || course.category === selectedCategory;
      const savedMatch = !showSaved || isCourseSaved(course.name);
      const searchMatch = 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      return categoryMatch && savedMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricing.amount - b.pricing.amount;
      if (sortBy === 'price-desc') return b.pricing.amount - a.pricing.amount;
      return 0; // Default order (usually newest/featured)
    });

  return (
    <>
      <MetaTags
        title="Our Programs | SED Tech Academy"
        description="Explore our industry-focused programs designed to equip you with the most in-demand skills and launch your career in tech."
      />

      {/* Hero Section */}
      <section className="relative bg-secondary pt-32 pb-20 lg:pt-48 lg:pb-28 text-center overflow-hidden">
        <div className="absolute top-0 left-0 -z-0 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 bg-gradient-to-br from-primary to-secondary rounded-full opacity-10 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 z-10">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
            Our Programs
          </h1>
          <p className="mt-6 text-lg md:text-xl text-primary/80 max-w-3xl mx-auto">
            Explore our industry-focused programs designed to equip you with the most in-demand skills and launch your career in tech.
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section id="programs-list" className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-6">
          
          {/* Search and Filter Controls */}
          <div className="mb-12 space-y-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Search Bar */}
              <div className="relative w-full md:max-w-md">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white text-text-primary shadow-sm transition-shadow"
                  placeholder="Search courses by name or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <label htmlFor="sort" className="text-text-primary font-medium whitespace-nowrap">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full md:w-48 py-3 px-4 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white text-text-primary shadow-sm cursor-pointer"
                >
                  <option value="newest">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Categories */}
            <div>
                <h2 className="font-poppins font-bold text-2xl text-primary text-center md:text-left mb-4">Categories</h2>
                <div className="flex flex-wrap gap-2 md:gap-4">
                {courseCategories.map(category => (
                    <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`font-poppins font-semibold py-2 px-5 rounded-full border-2 transition-all duration-300 text-sm md:text-base ${
                        selectedCategory === category
                        ? 'bg-primary text-secondary border-primary shadow-md'
                        : 'bg-transparent text-primary border-primary/30 hover:bg-primary/10 hover:border-primary/50'
                    }`}
                    >
                    {category}
                    </button>
                ))}
                </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-t border-primary/10 pt-8">
            <h3 className="font-poppins font-semibold text-2xl text-primary text-center md:text-left mb-4 md:mb-0">
              {showSaved ? 'Your Saved Programs' : (selectedCategory === 'All' && !searchQuery ? 'All Programs' : 'Search Results')}
              <span className="text-lg text-primary ml-2">({filteredCourses.length})</span>
            </h3>
            {savedCourses.length > 0 && (
              <button
                onClick={() => setShowSaved(!showSaved)}
                className={`font-poppins font-semibold py-2 px-6 rounded-lg border-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  showSaved 
                  ? 'bg-primary text-secondary border-primary' 
                  : 'bg-transparent text-primary border-primary hover:bg-primary/10'
                }`}
              >
                {showSaved ? 'Show All' : `View Saved (${savedCourses.length})`}
              </button>
            )}
          </div>
          
          {filteredCourses.length > 0 ? (
             <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredCourses.map((course, index) => (
                <div
                  key={course.name}
                  className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-white rounded-2xl border border-primary/10 shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/5 mb-4">
                     <svg className="w-8 h-8 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h3 className="font-poppins font-bold text-2xl text-primary">
                  {showSaved ? 'No Saved Courses Found' : 'No Matching Courses'}
                </h3>
                <p className="mt-2 text-primary/80">
                  {showSaved 
                    ? 'Try viewing all programs or adjusting your filters.' 
                    : `We couldn't find any courses matching "${searchQuery}" in the ${selectedCategory} category.`}
                </p>
                 {!showSaved && savedCourses.length === 0 && (
                    <p className="mt-4 text-sm text-primary/60">Tip: Click the bookmark icon on any course to save it for later!</p>
                 )}
                 {(searchQuery || selectedCategory !== 'All') && (
                     <button 
                        onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setShowSaved(false); }}
                        className="mt-6 text-primary font-semibold hover:underline"
                     >
                         Clear all filters
                     </button>
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
