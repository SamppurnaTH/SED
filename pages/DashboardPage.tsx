
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { useCourses } from '../contexts/CoursesContext';
import { Course } from '../types';
import EnrolledCourseCard from '../components/EnrolledCourseCard';
import UpcomingDeadlines from '../components/UpcomingDeadlines';
import InstructorMessages from '../components/InstructorMessages';
import { MyCoursesIcon, ResumeIcon, SettingsIcon } from '../components/icons/DashboardIcons';
import { BriefcaseIcon } from '../components/icons/detailIcons';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { enrolledCourses: enrolledCourseInfo } = useUserProgress();
  const { courses } = useCourses();
  
  const enrolledCoursesDetails = enrolledCourseInfo
    .map(enrolled => {
      const course = courses.find(c => c.slug === enrolled.courseSlug);
      if (!course) return null;
      return { ...course, progress: enrolled.progress };
    })
    .filter((c): c is Course & { progress: number } => c !== null);

  return (
    <>
      {/* Dashboard Header */}
      <section className="bg-secondary pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-6">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-text-primary">
            My Learning
          </h1>
          <p className="mt-4 text-lg text-text-muted">
            Welcome back, {user?.name}! Let's continue your learning journey.
          </p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Main Content: Enrolled Courses */}
            <div className="lg:col-span-2">
              <h2 className="font-poppins font-bold text-3xl text-text-primary mb-8 flex items-center gap-3">
                <MyCoursesIcon className="w-8 h-8 text-primary" />
                Your Enrolled Programs
              </h2>
              
              {enrolledCoursesDetails.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {enrolledCoursesDetails.map(course => (
                    <EnrolledCourseCard key={course.slug} course={course} progress={course.progress} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-6 bg-white rounded-2xl border border-gray-200">
                    <h3 className="font-poppins font-bold text-2xl text-text-primary">
                      You haven't enrolled in any programs yet.
                    </h3>
                    <p className="mt-2 text-text-muted max-w-lg mx-auto">
                      Explore our catalog and start your learning journey today!
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
            
            {/* Sidebar: Widgets */}
            <div className="lg:col-span-1 space-y-8">
               <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-200">
                  <h3 className="font-poppins font-bold text-xl text-text-primary flex items-center gap-3">
                      <BriefcaseIcon className="w-6 h-6 text-primary" />
                      Career Tools
                  </h3>
                  <div className="mt-4">
                      <Link to="/resume-builder" className="group flex items-center gap-4 p-4 rounded-lg hover:bg-background transition-colors">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <ResumeIcon className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                              <p className="font-semibold text-text-primary group-hover:text-primary">AI Resume Builder</p>
                              <p className="text-sm text-text-muted">Craft a professional resume in minutes.</p>
                          </div>
                      </Link>
                  </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-200">
                  <h3 className="font-poppins font-bold text-xl text-text-primary mb-4">Account</h3>
                  <Link to="/profile" className="group flex items-center gap-4 p-4 rounded-lg hover:bg-background transition-colors">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <SettingsIcon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                          <p className="font-semibold text-text-primary group-hover:text-primary">Profile & Settings</p>
                          <p className="text-sm text-text-muted">Update your password and view profile.</p>
                      </div>
                  </Link>
              </div>
              <UpcomingDeadlines enrolledCourses={enrolledCoursesDetails} />
              <InstructorMessages />
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;