import React, { useState } from 'react';
import { INSTRUCTORS, COURSES } from '../../constants';
import { ViewState } from '../../App';
import { Star, Users, BookOpen, MessageSquare, Linkedin, Twitter, Globe, Mail, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { CourseDetailModal } from '../courses/CourseDetailModal';
import { CourseSummary } from '../../services/courseService';

interface InstructorProfilePageProps {
   instructorName: string;
   onNavigate: (view: ViewState) => void;
}

export const InstructorProfilePage: React.FC<InstructorProfilePageProps> = ({ instructorName, onNavigate }) => {
   const [selectedCourse, setSelectedCourse] = useState<CourseSummary | null>(null);

   // Convert Course from constants to CourseSummary for modal
   const mapCourseToCourseSummary = (course: typeof COURSES[0]): CourseSummary => ({
      id: String(course.id),
      _id: String(course.id),
      name: course.title,
      slug: course.title.toLowerCase().replace(/\s+/g, '-'),
      title: course.title,
      description: course.description,
      price: `$${course.price}`,
      image: course.image,
      level: course.level,
      rating: course.rating,
      students: course.students,
      duration: course.duration,
      lessons: course.lessons,
      instructor: course.instructor,
      category: course.category,
      whatYouWillLearn: course.whatYouWillLearn,
      requirements: course.requirements
   });

   // Find the instructor data
   const instructor = INSTRUCTORS.find(i => i.name === instructorName) || {
      name: instructorName,
      role: 'Instructor',
      bio: 'An experienced instructor passionate about teaching.',
      skills: ['Teaching', 'Mentorship'],
      students: 0,
      rating: 5.0,
      reviews: 0,
      socials: { linkedin: '#', twitter: '#', website: '#' }
   };

   // Find courses taught by this instructor
   const instructorCourses = COURSES.filter(c => c.instructor === instructorName);

   const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&background=EBF4FF&color=2563EB&bold=true&size=200`;

   return (
      <div className="pt-24 min-h-screen bg-slate-50">

         {/* Modal Integration */}
         {selectedCourse && (
            <CourseDetailModal
               course={selectedCourse}
               onClose={() => setSelectedCourse(null)}
               onEnroll={() => onNavigate('get-started')}
               onViewInstructor={() => { /* Already on instructor page */ }}
            />
         )}

         {/* Header / Cover Section */}
         <div className="relative bg-white mb-12 pb-12">
            <div className="h-48 lg:h-64 w-full bg-gradient-to-r from-brand-600 to-brand-800 overflow-hidden relative">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="relative -mt-20 sm:-mt-24 flex flex-col sm:flex-row items-center sm:items-end gap-6 pb-6 border-b border-slate-200">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white z-10">
                     <img src={avatarUrl} alt={instructor.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
                     <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{instructor.name}</h1>
                     <p className="text-brand-600 font-medium text-lg">{instructor.role}</p>

                     <div className="flex items-center justify-center sm:justify-start gap-4 mt-4 text-slate-500">
                        {instructor.socials.linkedin && (
                           <a href={instructor.socials.linkedin} className="hover:text-brand-600 transition-colors"><Linkedin size={20} /></a>
                        )}
                        {instructor.socials.twitter && (
                           <a href={instructor.socials.twitter} className="hover:text-brand-600 transition-colors"><Twitter size={20} /></a>
                        )}
                        {instructor.socials.website && (
                           <a href={instructor.socials.website} className="hover:text-brand-600 transition-colors"><Globe size={20} /></a>
                        )}
                        <a href="#" className="hover:text-brand-600 transition-colors"><Mail size={20} /></a>
                     </div>
                  </div>

                  <div className="flex-shrink-0 flex gap-3">
                     <Button onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}>
                        View Courses
                     </Button>
                     <Button variant="outline" onClick={() => onNavigate('courses')}>
                        Back to All Courses
                     </Button>
                  </div>
               </div>

               {/* Quick Stats */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                  <div className="text-center sm:text-left">
                     <div className="text-sm text-slate-500 font-medium uppercase tracking-wide mb-1">Total Students</div>
                     <div className="text-2xl font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                        <Users size={20} className="text-brand-500" />
                        {instructor.students.toLocaleString()}
                     </div>
                  </div>
                  <div className="text-center sm:text-left">
                     <div className="text-sm text-slate-500 font-medium uppercase tracking-wide mb-1">Instructor Rating</div>
                     <div className="text-2xl font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                        <Star size={20} className="text-yellow-400 fill-current" />
                        {instructor.rating} <span className="text-sm text-slate-400 font-normal">/ 5.0</span>
                     </div>
                  </div>
                  <div className="text-center sm:text-left">
                     <div className="text-sm text-slate-500 font-medium uppercase tracking-wide mb-1">Reviews</div>
                     <div className="text-2xl font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                        <MessageSquare size={20} className="text-brand-500" />
                        {instructor.reviews}
                     </div>
                  </div>
                  <div className="text-center sm:text-left">
                     <div className="text-sm text-slate-500 font-medium uppercase tracking-wide mb-1">Courses</div>
                     <div className="text-2xl font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                        <BookOpen size={20} className="text-brand-500" />
                        {instructorCourses.length}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Left Column: About & Skills */}
               <div className="space-y-8">
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                     <h3 className="text-xl font-bold text-slate-900 mb-4">About Me</h3>
                     <p className="text-slate-600 leading-relaxed">
                        {instructor.bio}
                     </p>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                     <h3 className="text-xl font-bold text-slate-900 mb-4">Key Expertise</h3>
                     <div className="flex flex-wrap gap-2">
                        {instructor.skills.map(skill => (
                           <span key={skill} className="px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-sm font-medium border border-brand-100">
                              {skill}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Right Column: Courses */}
               <div id="courses" className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                     <BookOpen className="text-brand-600" />
                     Courses by {instructor.name}
                  </h2>

                  <div className="space-y-6">
                     {instructorCourses.map(course => (
                        <div
                           key={course.id}
                           className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col sm:flex-row h-auto sm:h-48"
                           onClick={() => setSelectedCourse(mapCourseToCourseSummary(course))}
                        >
                           <div className="w-full sm:w-64 h-48 sm:h-full flex-shrink-0 relative">
                              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                              <div className="absolute top-2 left-2">
                                 <span className="px-2 py-1 bg-white/90 backdrop-blur text-brand-700 text-xs font-bold rounded uppercase tracking-wide">
                                    {course.level}
                                 </span>
                              </div>
                           </div>
                           <div className="p-6 flex flex-col justify-between flex-grow">
                              <div>
                                 <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-brand-600 uppercase tracking-wide">{course.category}</span>
                                    <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                                       <Star size={14} className="fill-current" />
                                       {course.rating}
                                    </div>
                                 </div>
                                 <h3 className="text-xl font-bold text-slate-900 mb-2 hover:text-brand-600 transition-colors">
                                    {course.title}
                                 </h3>
                                 <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                                    {course.description}
                                 </p>
                              </div>

                              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                 <div className="flex gap-4 text-xs text-slate-500 font-medium">
                                    <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                                    <span className="flex items-center gap-1"><Users size={14} /> {course.students.toLocaleString()}</span>
                                 </div>
                                 <div className="text-lg font-bold text-slate-900">
                                    {course.price}
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
