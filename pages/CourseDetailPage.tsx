import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { courses } from '../constants';
import CTA from '../components/CTA';
import { CheckCircleIcon, BriefcaseIcon, RupeeIcon, CertificateIcon, ClockIcon } from '../components/icons/detailIcons';
import { useSavedCourses } from '../contexts/SavedCoursesContext';
import { BookmarkIcon } from '../components/icons/BookmarkIcon';
import InteractiveDemo from '../components/InteractiveDemo';
import CurriculumAccordion from '../components/CurriculumAccordion';
import CourseCard from '../components/CourseCard';

const CourseDetailPage: React.FC = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const course = courses.find(c => c.slug === courseSlug);
  const { toggleSaveCourse, isCourseSaved } = useSavedCourses();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleFaqClick = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  if (!course) {
    return <Navigate to="/programs" replace />;
  }

  const saved = isCourseSaved(course.name);

  const relatedCourses = courses
    .filter(c => c.category === course.category && c.slug !== course.slug)
    .slice(0, 3);

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
      <section className="py-20 lg:py-28 bg-light-gray">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Left Column: Course Details */}
            <div className="lg:col-span-2 space-y-16">
              {/* Program Overview */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="font-poppins font-bold text-3xl text-dark-gray">Program Overview</h2>
                <p className="mt-4 text-lg text-dark-gray/80 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Course Curriculum */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="font-poppins font-bold text-3xl text-dark-gray">Course Curriculum</h2>
                <p className="mt-2 text-dark-gray/80">A week-by-week breakdown of what you'll learn.</p>
                <div className="mt-6">
                  <CurriculumAccordion curriculum={course.curriculum} />
                </div>
              </div>

               {/* Course-specific FAQs */}
              {course.faqs && course.faqs.length > 0 && (
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                      <h2 className="font-poppins font-bold text-3xl text-dark-gray">Frequently Asked Questions</h2>
                      <div className="mt-6 border-t border-gray-200">
                          {course.faqs.map((faq, index) => (
                              <div key={index} className="border-b border-gray-200">
                                  <button
                                      onClick={() => handleFaqClick(index)}
                                      className="w-full flex justify-between items-center text-left py-5 px-2 gap-4"
                                      aria-expanded={openFaqIndex === index}
                                  >
                                      <h3 className={`font-poppins font-semibold text-lg transition-colors ${openFaqIndex === index ? 'text-primary' : 'text-dark-gray'}`}>
                                          {faq.question}
                                      </h3>
                                      <span className="text-primary flex-shrink-0 ml-4">
                                          <svg
                                              className={`w-6 h-6 transform transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}
                                              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                          </svg>
                                      </span>
                                  </button>
                                  <div
                                      className={`grid transition-all duration-500 ease-in-out ${openFaqIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                      <div className="overflow-hidden">
                                          <p className="pb-6 pl-2 pr-2 text-dark-gray/80 leading-relaxed">{faq.answer}</p>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              {/* Projects You'll Build */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="font-poppins font-bold text-3xl text-dark-gray">Projects You'll Build</h2>
                 <p className="mt-2 text-dark-gray/80">Gain hands-on experience by building a portfolio of real-world projects.</p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {course.projects.map((project, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
                      <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover"/>
                      <div className="p-6">
                        <h4 className="font-poppins font-bold text-xl text-dark-gray">{project.title}</h4>
                        <p className="mt-2 text-dark-gray/80">{project.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Meet Your Instructor */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                 <h2 className="font-poppins font-bold text-3xl text-dark-gray mb-6">Meet Your Instructor</h2>
                 <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
                    <img src={course.instructor.imageUrl} alt={course.instructor.name} className="w-28 h-28 rounded-full object-cover flex-shrink-0" />
                    <div className="mt-4 sm:mt-0 text-center sm:text-left">
                        <h4 className="font-poppins font-bold text-2xl text-dark-gray">{course.instructor.name}</h4>
                        <p className="text-primary font-medium text-lg">{course.instructor.title}</p>
                         <p className="mt-2 text-dark-gray/80">{course.instructor.bio}</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right Column: Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                 {/* Pricing Card */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-poppins font-bold text-3xl text-dark-gray">
                       ₹{course.pricing.amount.toLocaleString('en-IN')}
                    </h3>
                     <button
                      onClick={() => toggleSaveCourse(course.name)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        saved
                          ? 'bg-primary/10 text-primary scale-110'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                      aria-label={saved ? `Remove ${course.name} from saved` : `Save ${course.name}`}
                    >
                      <BookmarkIcon className="w-6 h-6" isSaved={saved} />
                    </button>
                  </div>
                  <p className="text-dark-gray/70 mt-1">{course.pricing.note}</p>
                  
                  <div className="mt-6 space-y-3">
                    <Link to="/#contact" className="block w-full bg-primary text-white font-poppins font-bold py-4 px-8 text-center rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300 transform">
                    Enroll Now
                    </Link>
                    {course.slug === 'full-stack-development' && (
                        <button onClick={() => setIsDemoModalOpen(true)} className="block w-full bg-secondary text-primary font-poppins font-bold py-4 px-8 text-center rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300 transform">
                            Try Demo
                        </button>
                    )}
                  </div>
                  <div className="mt-8">
                    <h4 className="font-poppins font-semibold text-dark-gray">This includes:</h4>
                    <ul className="mt-4 space-y-3">
                      {course.pricing.inclusions.map((item, index) => (
                        <li key={index} className="flex items-center">
                           {index % 2 === 0 ? <CertificateIcon className="w-5 h-5 text-primary mr-3 flex-shrink-0" /> : <BriefcaseIcon className="w-5 h-5 text-primary mr-3 flex-shrink-0" />}
                          <span className="text-dark-gray/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Highlights Card */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                    <h3 className="font-poppins font-bold text-2xl text-dark-gray">Key Highlights</h3>
                    <ul className="mt-6 space-y-5">
                      <li className="flex items-center">
                          <div className="w-10 h-10 bg-light-gray rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                            <ClockIcon className="w-6 h-6 text-primary" />
                          </div>
                          <span className="font-semibold text-dark-gray/90">{course.duration}</span>
                      </li>
                      {course.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-10 h-10 bg-light-gray rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                            <CheckCircleIcon className="w-6 h-6 text-primary" />
                          </div>
                          <span className="font-semibold text-dark-gray/90">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* You Might Also Like Section */}
          {relatedCourses.length > 0 && (
            <div className="mt-20 lg:mt-28">
              <h2 className="font-poppins font-bold text-3xl text-dark-gray text-center mb-12">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {relatedCourses.map(relatedCourse => (
                  <CourseCard key={relatedCourse.slug} course={relatedCourse} />
                ))}
              </div>
            </div>
          )}
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