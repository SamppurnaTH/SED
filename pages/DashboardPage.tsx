
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSavedCourses } from '../contexts/SavedCoursesContext';
import { courses } from '../constants';
import CourseCard from '../components/CourseCard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { isCourseSaved } = useSavedCourses();
  
  const savedCourseDetails = courses.filter(course => isCourseSaved(course.name));

  return (
    <>
      {/* Dashboard Header */}
      <section className="bg-light-gray pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-6">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-dark-gray">
            Welcome, {user?.name}!
          </h1>
          <p className="mt-4 text-lg text-dark-gray/80">
            This is your personal dashboard. Here you can manage your courses and profile.
          </p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6">
          <h2 className="font-poppins font-bold text-3xl text-dark-gray mb-10">
            Your Saved Programs
          </h2>
          
          {savedCourseDetails.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {savedCourseDetails.map(course => (
                <CourseCard key={course.name} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-light-gray rounded-2xl border border-gray-200">
                <h3 className="font-poppins font-bold text-2xl text-dark-gray">
                  You haven't saved any programs yet.
                </h3>
                <p className="mt-2 text-dark-gray/80 max-w-lg mx-auto">
                  Browse our programs and click the bookmark icon on any course to save it here for later!
                </p>
                <div className="mt-8">
                    <Link 
                        to="/programs" 
                        className="bg-primary text-white font-poppins font-bold py-3 px-8 rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 transform"
                    >
                        Explore Programs
                    </Link>
                </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
