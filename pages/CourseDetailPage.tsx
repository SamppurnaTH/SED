
import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { courses } from '../constants';
import CTA from '../components/CTA';
import { CheckCircleIcon, StarIcon, UsersIcon, BriefcaseIcon } from '../components/icons/detailIcons';
import { useSavedCourses } from '../contexts/SavedCoursesContext';
import { BookmarkIcon } from '../components/icons/BookmarkIcon';
import InteractiveDemo from '../components/InteractiveDemo';

const CourseDetailPage: React.FC = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const course = courses.find(c => c.slug === courseSlug);
  const { toggleSaveCourse, isCourseSaved } = useSavedCourses();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  if (!course) {
    return <Navigate to="/programs" replace />;
  }

  const saved = isCourseSaved(course.name);
  
  const highlightIcons = [
    <BriefcaseIcon className="w-8 h-8 text-primary" />,
    <StarIcon className="w-8 h-8 text-primary" />,
    <UsersIcon className="w-8 h-8 text-primary" />,
    <CheckCircleIcon className="w-8 h-8 text-primary" />
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 pt-32 pb-20 lg:pt-48 lg:pb-28 text-center overflow-hidden">
         <div className="absolute top-0 right-0 -z-0 transform translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 bg-gradient-to-br from-accent to-secondary rounded-full opacity-10 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 z-10">
          <p className="font-semibold text-primary uppercase tracking-widest">{course.category}</p>
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-dark-gray leading-tight mt-2">
            {course.name}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-dark-gray/80 max-w-3xl mx-auto">
            {course.tagline}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Left Column: Description & Objectives */}
            <div className="lg:col-span-2">
              <h2 className="font-poppins font-bold text-3xl text-dark-gray">Program Overview</h2>
              <p className="mt-4 text-lg text-dark-gray/80 leading-relaxed">
                {course.description}
              </p>

              <h3 className="font-poppins font-bold text-2xl text-dark-gray mt-12">What You'll Learn</h3>
              <ul className="mt-6 space-y-4">
                {course.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-dark-gray/90">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Highlights & Instructor */}
            <div className="lg:col-span-1">
              <div className="bg-light-gray p-8 rounded-2xl sticky top-28">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-poppins font-bold text-2xl text-dark-gray">Key Highlights</h3>
                  </div>
                   <button
                    onClick={() => toggleSaveCourse(course.name)}
                    className={`p-2 rounded-full transition-all duration-300 -mt-2 -mr-2 ${
                      saved
                        ? 'bg-primary/10 text-primary scale-110'
                        : 'bg-white text-gray-500 hover:bg-gray-200'
                    }`}
                    aria-label={saved ? `Remove ${course.name} from saved` : `Save ${course.name}`}
                  >
                    <BookmarkIcon className="w-6 h-6" isSaved={saved} />
                  </button>
                </div>
                <ul className="mt-6 space-y-5">
                  {course.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                        {highlightIcons[index % highlightIcons.length]}
                      </div>
                      <span className="font-semibold text-dark-gray/90">{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 space-y-3">
                    <Link to="/#contact" className="block w-full bg-primary text-white font-poppins font-bold py-4 px-8 text-center rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300 transform">
                    Enroll Now
                    </Link>
                    {course.slug === 'full-stack-development' && (
                        <button onClick={() => setIsDemoModalOpen(true)} className="block w-full bg-secondary text-primary font-poppins font-bold py-4 px-8 text-center rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300 transform">
                            Try Demo
                        </button>
                    )}
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl mt-8 border border-gray-200 shadow-sm">
                 <h3 className="font-poppins font-bold text-2xl text-dark-gray mb-6">Meet Your Instructor</h3>
                 <div className="flex items-center space-x-4">
                    <img src={course.instructor.imageUrl} alt={course.instructor.name} className="w-20 h-20 rounded-full object-cover" />
                    <div>
                        <h4 className="font-poppins font-bold text-lg text-dark-gray">{course.instructor.name}</h4>
                        <p className="text-primary font-medium">{course.instructor.title}</p>
                    </div>
                 </div>
                 <p className="mt-4 text-dark-gray/80">{course.instructor.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      
      {course.slug === 'full-stack-development' && (
        <InteractiveDemo isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      )}
    </>
  );
};

export default CourseDetailPage;
