




import React, { useState } from 'react';
import { ViewState } from '../../App';
import {
   LayoutDashboard, BookOpen, Calendar, FileText, Award, Settings, LogOut,
   Bell, Search, PlayCircle, CheckCircle, Clock, User, Menu, X, ChevronRight,
   Video, Download, Star, TrendingUp, ArrowRight, MoreHorizontal, ChevronLeft, Lock, HelpCircle
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { COURSES } from '../../constants';

interface StudentDashboardProps {
   onNavigate: (view: ViewState) => void;
}

type StudentTab = 'dashboard' | 'my-courses' | 'schedule' | 'assignments' | 'certificates' | 'settings';

// Mock Student Data
const STUDENT_PROFILE = {
   name: 'John Doe',
   email: 'john.doe@example.com',
   avatar: 'J',
   enrolledCourses: [
      { ...COURSES[0], progress: 65, lastAccessed: '2 hours ago', nextLesson: 'State Management in React' },
      { ...COURSES[3], progress: 12, lastAccessed: '3 days ago', nextLesson: 'Python Lists & Dictionaries' },
      { ...COURSES[7], progress: 100, lastAccessed: '1 week ago', nextLesson: 'Completed' }
   ],
   assignments: [
      { id: 1, title: 'React Component Structure', course: 'Full Stack Web Development', dueDate: 'Mar 25, 2024', status: 'Pending', grade: '-' },
      { id: 2, title: 'Python Data Analysis Script', course: 'Python for Beginners', dueDate: 'Mar 20, 2024', status: 'Submitted', grade: 'Waiting' },
      { id: 3, title: 'UI Design System', course: 'UI/UX Design Fundamentals', dueDate: 'Feb 28, 2024', status: 'Graded', grade: 'A (95%)' }
   ],
   schedule: [
      { id: 1, title: 'Live Q&A: React Hooks', type: 'Live Class', date: 'Tomorrow', time: '10:00 AM - 11:00 AM', link: '#', instructor: 'Alex Rivera' },
      { id: 2, title: 'Python Project Submission', type: 'Deadline', date: 'Mar 20', time: '11:59 PM', link: '#', instructor: 'Emily Davis' },
      { id: 3, title: 'Career Mentorship Session', type: 'Meeting', date: 'Mar 22', time: '2:00 PM - 2:30 PM', link: '#', instructor: 'Sarah Jenkins' }
   ],
   certificates: [
      { id: 1, course: 'UI/UX Design Fundamentals', date: 'Mar 10, 2024', id_code: 'SED-CERT-2024-8821' }
   ]
};

// Mock Detailed Progress Data
const COURSE_PROGRESS_DETAILS: Record<number, any> = {
   1: {
      totalTimeSpent: '24h 15m',
      quizAverage: '88%',
      modules: [
         { id: 1, title: 'Introduction to MERN Stack', status: 'Completed', score: '100%', duration: '2h 10m', lessons: 5 },
         { id: 2, title: 'React Fundamentals', status: 'Completed', score: '92%', duration: '5h 30m', lessons: 12 },
         { id: 3, title: 'Node.js & Express Basics', status: 'Completed', score: '85%', duration: '4h 45m', lessons: 8 },
         { id: 4, title: 'Database Design with MongoDB', status: 'In Progress', score: '-', duration: '3h 15m', lessons: 10, current: true },
         { id: 5, title: 'State Management (Redux)', status: 'Locked', score: '-', duration: '4h 00m', lessons: 8 },
         { id: 6, title: 'Authentication & Security', status: 'Locked', score: '-', duration: '3h 30m', lessons: 6 },
      ]
   },
   4: {
      totalTimeSpent: '4h 30m',
      quizAverage: '90%',
      modules: [
         { id: 1, title: 'Python Syntax & Variables', status: 'Completed', score: '95%', duration: '1h 30m', lessons: 4 },
         { id: 2, title: 'Control Flow', status: 'In Progress', score: '-', duration: '2h 00m', lessons: 6, current: true },
         { id: 3, title: 'Functions & Modules', status: 'Locked', score: '-', duration: '2h 30m', lessons: 5 },
         { id: 4, title: 'Data Structures', status: 'Locked', score: '-', duration: '3h 00m', lessons: 8 },
      ]
   },
   8: {
      totalTimeSpent: '18h 45m',
      quizAverage: '96%',
      modules: [
         { id: 1, title: 'Design Thinking', status: 'Completed', score: '98%', duration: '3h 00m', lessons: 6 },
         { id: 2, title: 'Wireframing & Prototyping', status: 'Completed', score: '95%', duration: '5h 30m', lessons: 10 },
         { id: 3, title: 'Visual Design Principles', status: 'Completed', score: '94%', duration: '4h 15m', lessons: 8 },
         { id: 4, title: 'Figma Mastery', status: 'Completed', score: '97%', duration: '6h 00m', lessons: 12 },
      ]
   }
};


export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
   const [activeTab, setActiveTab] = useState<StudentTab>('dashboard');
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const [viewingCourseId, setViewingCourseId] = useState<number | null>(null);
   const [selectedScheduleItem, setSelectedScheduleItem] = useState<any>(null);

   const SidebarItem = ({ id, icon: Icon, label }: { id: StudentTab, icon: any, label: string }) => (
      <button
         onClick={() => {
            setActiveTab(id);
            setViewingCourseId(null); // Reset view when switching tabs
            if (window.innerWidth < 1024) setIsSidebarOpen(false);
         }}
         className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === id
            ? 'bg-brand-600 text-white shadow-md'
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
      >
         <Icon size={20} />
         <span className="font-medium">{label}</span>
      </button>
   );

   return (
      <div className="min-h-screen bg-slate-50 flex relative">

         {/* Schedule Detail Modal */}
         {selectedScheduleItem && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
               <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
                  {/* Header */}
                  <div className="flex justify-between items-center p-6 border-b border-slate-100">
                     <h3 className="text-xl font-bold text-slate-900">Event Details</h3>
                     <button onClick={() => setSelectedScheduleItem(null)} className="text-slate-400 hover:text-slate-600">
                        <X size={24} />
                     </button>
                  </div>
                  {/* Content */}
                  <div className="p-6 space-y-4">
                     <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${selectedScheduleItem.type === 'Live Class' ? 'bg-red-100 text-red-600' :
                        selectedScheduleItem.type === 'Deadline' ? 'bg-orange-100 text-orange-600' :
                           'bg-blue-100 text-blue-600'
                        }`}>
                        {selectedScheduleItem.type}
                     </span>
                     <h4 className="text-xl font-bold text-slate-900">{selectedScheduleItem.title}</h4>

                     <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3 text-slate-600">
                           <Calendar size={18} className="text-brand-500" />
                           <span className="font-medium">{selectedScheduleItem.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                           <Clock size={18} className="text-brand-500" />
                           <span className="font-medium">{selectedScheduleItem.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                           <User size={18} className="text-brand-500" />
                           <span className="font-medium">Instructor: {selectedScheduleItem.instructor || 'TBD'}</span>
                        </div>
                     </div>

                     <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-600 mt-4">
                        <p className="font-bold text-slate-900 mb-1">Description</p>
                        <p>This is a scheduled {selectedScheduleItem.type.toLowerCase()} for your course. Please ensure you are prepared with any necessary materials and join on time.</p>
                     </div>
                  </div>
                  {/* Footer */}
                  <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                     <Button variant="outline" onClick={() => setSelectedScheduleItem(null)}>Close</Button>
                     {selectedScheduleItem.type === 'Live Class' && (
                        <Button className="bg-red-600 hover:bg-red-700 border-none">
                           <Video size={16} className="mr-2" /> Join Now
                        </Button>
                     )}
                     {selectedScheduleItem.type === 'Meeting' && (
                        <Button className="bg-brand-600 hover:bg-brand-700">
                           <Video size={16} className="mr-2" /> Join Meeting
                        </Button>
                     )}
                  </div>
               </div>
            </div>
         )}

         {/* Sidebar */}
         <aside
            className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-64 flex-shrink-0'
               }`}
         >
            <div className="h-full flex flex-col">
               <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
                     <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center font-bold text-white">S</div>
                     <span className="text-xl font-display font-bold">SED<span className="text-brand-500">.</span></span>
                  </div>
                  <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400">
                     <X size={24} />
                  </button>
               </div>

               <div className="px-6 py-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 border border-slate-700">
                     <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-lg font-bold">
                        {STUDENT_PROFILE.avatar}
                     </div>
                     <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">{STUDENT_PROFILE.name}</p>
                        <p className="text-xs text-slate-400 truncate">Student Account</p>
                     </div>
                  </div>
               </div>

               <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
                  <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
                  <SidebarItem id="my-courses" icon={BookOpen} label="My Courses" />
                  <SidebarItem id="assignments" icon={FileText} label="Assignments" />
                  <SidebarItem id="schedule" icon={Calendar} label="Schedule" />
                  <SidebarItem id="certificates" icon={Award} label="Certificates" />
                  <SidebarItem id="settings" icon={Settings} label="Settings" />
               </nav>

               <div className="p-4 border-t border-slate-800">
                  <button
                     onClick={() => onNavigate('login')}
                     className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-900/20 hover:text-red-500 transition-colors"
                  >
                     <LogOut size={20} />
                     <span className="font-medium">Log Out</span>
                  </button>
               </div>
            </div>
         </aside>

         {/* Main Content */}
         <main className="flex-1 flex flex-col h-screen overflow-hidden w-full">

            {/* Top Header */}
            <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 lg:px-8 z-40 flex-shrink-0">
               <div className="flex items-center gap-4">
                  <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-500">
                     <Menu size={24} />
                  </button>
                  <h2 className="text-xl font-bold text-slate-800 capitalize">
                     {activeTab === 'my-courses' ? 'My Courses' : activeTab}
                  </h2>
               </div>

               <div className="flex items-center gap-4 sm:gap-6">
                  <div className="relative hidden md:block">
                     <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input
                        type="text"
                        placeholder="Search courses, lessons..."
                        className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 w-64"
                     />
                  </div>
                  <button
                     onClick={() => onNavigate('notifications')}
                     className="relative text-slate-500 hover:text-slate-700 transition-colors"
                  >
                     <Bell size={20} />
                     <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
                  <button onClick={() => onNavigate('home')} className="text-sm font-medium text-brand-600 hover:text-brand-700 hidden sm:block">
                     Back to Website
                  </button>
               </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">

               {/* Dashboard Overview */}
               {activeTab === 'dashboard' && (
                  <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">

                     {/* Welcome Banner */}
                     <div className="bg-gradient-to-r from-brand-600 to-blue-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
                        <div className="relative z-10">
                           <h1 className="text-3xl font-display font-bold mb-2">Hello, {STUDENT_PROFILE.name}! 👋</h1>
                           <p className="text-brand-100 text-lg mb-6">You've learned 80% more this week. Keep it up!</p>

                           {STUDENT_PROFILE.enrolledCourses[0] && (
                              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl inline-block max-w-md">
                                 <p className="text-xs text-brand-200 uppercase font-bold mb-1">Continue Learning</p>
                                 <h3 className="font-bold text-lg mb-1">{STUDENT_PROFILE.enrolledCourses[0].title}</h3>
                                 <p className="text-sm text-white/80 mb-3">Next: {STUDENT_PROFILE.enrolledCourses[0].nextLesson}</p>
                                 <Button size="sm" className="bg-white text-brand-600 hover:bg-brand-50 border-none">
                                    <PlayCircle size={16} className="mr-2" /> Resume
                                 </Button>
                              </div>
                           )}
                        </div>
                     </div>

                     {/* Stats Grid */}
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                           <div className="flex justify-between items-start mb-4">
                              <div className="p-3 rounded-lg bg-blue-50 text-blue-600"><BookOpen size={24} /></div>
                              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">Active</span>
                           </div>
                           <h3 className="text-3xl font-bold text-slate-900 mb-1">2</h3>
                           <p className="text-sm text-slate-500">Courses in Progress</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                           <div className="flex justify-between items-start mb-4">
                              <div className="p-3 rounded-lg bg-green-50 text-green-600"><CheckCircle size={24} /></div>
                              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">Done</span>
                           </div>
                           <h3 className="text-3xl font-bold text-slate-900 mb-1">1</h3>
                           <p className="text-sm text-slate-500">Courses Completed</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                           <div className="flex justify-between items-start mb-4">
                              <div className="p-3 rounded-lg bg-purple-50 text-purple-600"><Award size={24} /></div>
                              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">Earned</span>
                           </div>
                           <h3 className="text-3xl font-bold text-slate-900 mb-1">1</h3>
                           <p className="text-sm text-slate-500">Certificates</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                           <div className="flex justify-between items-start mb-4">
                              <div className="p-3 rounded-lg bg-orange-50 text-orange-600"><Clock size={24} /></div>
                              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">This Week</span>
                           </div>
                           <h3 className="text-3xl font-bold text-slate-900 mb-1">12.5h</h3>
                           <p className="text-sm text-slate-500">Learning Time</p>
                        </div>
                     </div>

                     {/* My Progress Section (New) */}
                     <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                           <div>
                              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                                 <TrendingUp className="text-brand-600" size={20} /> My Learning Progress
                              </h3>
                              <p className="text-sm text-slate-500 mt-1">Track your completion status across all enrolled courses.</p>
                           </div>
                           <Button variant="ghost" size="sm" onClick={() => setActiveTab('my-courses')}>
                              View All Courses <ArrowRight size={16} className="ml-1" />
                           </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                           {STUDENT_PROFILE.enrolledCourses.map((course) => {
                              const completedLessons = Math.round((course.progress / 100) * course.lessons);
                              return (
                                 <div key={course.id} className="relative">
                                    <div className="flex justify-between items-end mb-2">
                                       <div>
                                          <h4 className="font-bold text-slate-900 text-sm line-clamp-1" title={course.title}>{course.title}</h4>
                                          <p className="text-xs text-slate-500">{completedLessons}/{course.lessons} Lessons</p>
                                       </div>
                                       <span className={`text-sm font-bold ${course.progress === 100 ? 'text-green-600' :
                                          course.progress > 50 ? 'text-brand-600' :
                                             'text-orange-500'
                                          }`}>{course.progress}%</span>
                                    </div>

                                    <div className="w-full bg-slate-100 rounded-full h-2.5 mb-3 overflow-hidden">
                                       <div
                                          style={{ width: `${course.progress}%` }}
                                          className={`h-2.5 rounded-full transition-all duration-1000 ${course.progress === 100 ? 'bg-green-500' :
                                             course.progress > 50 ? 'bg-brand-500' :
                                                'bg-orange-400'
                                             }`}
                                       ></div>
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                       <span className="flex items-center gap-1"><Clock size={10} /> Last: {course.lastAccessed}</span>
                                       {course.progress === 100 ? (
                                          <span className="flex items-center gap-1 text-green-600 font-medium"><Award size={12} /> Certified</span>
                                       ) : (
                                          <span
                                             className="font-medium text-brand-600 cursor-pointer hover:underline"
                                             onClick={() => {
                                                setActiveTab('my-courses');
                                                setViewingCourseId(course.id);
                                             }}
                                          >
                                             Resume
                                          </span>
                                       )}
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                     </div>

                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Upcoming Schedule */}
                        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                           <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                              <h3 className="font-bold text-slate-900 text-lg">Upcoming Schedule</h3>
                              <Button variant="ghost" size="sm" onClick={() => setActiveTab('schedule')}>View All</Button>
                           </div>
                           <div className="divide-y divide-slate-100">
                              {STUDENT_PROFILE.schedule.map((item) => (
                                 <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedScheduleItem(item)}>
                                    <div className="flex-shrink-0 w-14 text-center bg-slate-50 rounded-lg border border-slate-100 p-2">
                                       <div className="text-xs text-slate-500 uppercase font-bold">{item.date.split(' ')[0].substring(0, 3)}</div>
                                       <div className="text-lg font-bold text-slate-900">{item.date.match(/\d+/) || '12'}</div>
                                    </div>
                                    <div className="flex-grow">
                                       <h4 className="font-bold text-slate-900">{item.title}</h4>
                                       <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${item.type === 'Live Class' ? 'bg-red-100 text-red-600' :
                                             item.type === 'Deadline' ? 'bg-orange-100 text-orange-600' :
                                                'bg-blue-100 text-blue-600'
                                             }`}>
                                             {item.type}
                                          </span>
                                          <span>•</span>
                                          <Clock size={14} />
                                          <span>{item.time}</span>
                                       </div>
                                    </div>
                                    <Button size="sm" variant="outline" className="hidden sm:flex" onClick={(e) => { e.stopPropagation(); setSelectedScheduleItem(item); }}>
                                       {item.type === 'Live Class' ? 'Join' : 'Details'}
                                    </Button>
                                 </div>
                              ))}
                           </div>
                        </div>

                        {/* Assignments */}
                        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                           <div className="p-6 border-b border-slate-100">
                              <h3 className="font-bold text-slate-900 text-lg">Assignments</h3>
                           </div>
                           <div className="divide-y divide-slate-100">
                              {STUDENT_PROFILE.assignments.slice(0, 3).map((assignment) => (
                                 <div key={assignment.id} className="p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                       <span className={`text-xs font-bold px-2 py-1 rounded-full ${assignment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                          assignment.status === 'Submitted' ? 'bg-blue-100 text-blue-700' :
                                             'bg-green-100 text-green-700'
                                          }`}>
                                          {assignment.status}
                                       </span>
                                       <span className="text-xs text-slate-500">{assignment.dueDate}</span>
                                    </div>
                                    <h4 className="font-medium text-slate-900 text-sm line-clamp-1 mb-1">{assignment.title}</h4>
                                    <p className="text-xs text-slate-500 line-clamp-1">{assignment.course}</p>
                                 </div>
                              ))}
                              <div className="p-4 text-center">
                                 <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab('assignments')}>See All Assignments</Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* My Courses Tab */}
               {activeTab === 'my-courses' && (
                  <div className="max-w-6xl mx-auto animate-fade-in-up">
                     {!viewingCourseId ? (
                        <>
                           <div className="flex justify-between items-center mb-8">
                              <div>
                                 <h2 className="text-2xl font-bold text-slate-900">My Courses</h2>
                                 <p className="text-slate-500">Manage and continue your learning journey.</p>
                              </div>
                              <div className="flex gap-2">
                                 <Button variant="outline" size="sm">In Progress</Button>
                                 <Button variant="ghost" size="sm">Completed</Button>
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {STUDENT_PROFILE.enrolledCourses.map((course) => (
                                 <div
                                    key={course.id}
                                    className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => setViewingCourseId(course.id)}
                                 >
                                    <div className="h-40 relative">
                                       <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                          <Button className="rounded-full pointer-events-none"><PlayCircle size={20} className="mr-2" /> Continue</Button>
                                       </div>
                                       <div className="absolute bottom-4 left-4 right-4">
                                          <div className="flex justify-between text-xs font-bold text-white mb-1">
                                             <span>{course.progress}% Completed</span>
                                             <span>{course.lessons} Lessons</span>
                                          </div>
                                          <div className="w-full bg-white/30 rounded-full h-1.5 backdrop-blur-sm">
                                             <div style={{ width: `${course.progress}%` }} className="bg-green-400 h-1.5 rounded-full"></div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                       <div className="flex justify-between items-start mb-2">
                                          <span className="text-xs font-bold text-brand-600 uppercase tracking-wide bg-brand-50 px-2 py-1 rounded">{course.category}</span>
                                          <div className="flex items-center text-yellow-500 text-xs font-bold">
                                             <Star size={12} className="fill-current mr-1" /> {course.rating}
                                          </div>
                                       </div>
                                       <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-1 group-hover:text-brand-600 transition-colors">{course.title}</h3>
                                       <p className="text-sm text-slate-500 mb-4 line-clamp-2">{course.description}</p>

                                       <div className="mt-auto pt-4 border-t border-slate-100">
                                          {course.progress === 100 ? (
                                             <div className="flex items-center text-green-600 text-sm font-bold">
                                                <CheckCircle size={16} className="mr-2" /> Course Completed
                                                <span className="ml-auto text-xs text-slate-400 font-normal"> Rated 5.0</span>
                                             </div>
                                          ) : (
                                             <div>
                                                <p className="text-xs text-slate-400 uppercase font-bold mb-1">Up Next</p>
                                                <div className="flex justify-between items-center">
                                                   <p className="text-sm font-medium text-slate-800 truncate max-w-[70%]">{course.nextLesson}</p>
                                                   <span className="text-brand-600 text-sm font-bold flex items-center">
                                                      Start <ChevronRight size={16} />
                                                   </span>
                                                </div>
                                             </div>
                                          )}
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </>
                     ) : (
                        /* Detailed Course View */
                        <div className="animate-fade-in-up">
                           {/* Nav Back */}
                           <button
                              onClick={() => setViewingCourseId(null)}
                              className="flex items-center text-slate-500 hover:text-slate-900 mb-6 font-medium"
                           >
                              <ChevronLeft size={20} className="mr-1" /> Back to Courses
                           </button>

                           {(() => {
                              const course = STUDENT_PROFILE.enrolledCourses.find(c => c.id === viewingCourseId);
                              const details = COURSE_PROGRESS_DETAILS[viewingCourseId || 0] || {
                                 totalTimeSpent: '2h 15m',
                                 quizAverage: '0%',
                                 modules: [
                                    { id: 1, title: 'Introduction', status: 'In Progress', score: '-', duration: '45m', lessons: 3, current: true },
                                    { id: 2, title: 'Core Concepts', status: 'Locked', score: '-', duration: '1h 30m', lessons: 5 },
                                 ]
                              };

                              if (!course) return <div>Course not found</div>;

                              return (
                                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Main Content */}
                                    <div className="lg:col-span-2 space-y-6">
                                       {/* Header Card */}
                                       <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                          <div className="h-32 bg-slate-900 relative">
                                             <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-40" />
                                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                                             <div className="absolute bottom-6 left-6 text-white">
                                                <div className="flex gap-2 mb-2">
                                                   <span className="bg-brand-600 text-white text-xs font-bold px-2 py-0.5 rounded uppercase">{course.category}</span>
                                                </div>
                                                <h1 className="text-2xl font-bold">{course.title}</h1>
                                             </div>
                                          </div>
                                          <div className="p-6">
                                             <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-bold text-slate-700">Overall Progress</span>
                                                <span className="text-sm font-bold text-brand-600">{course.progress}%</span>
                                             </div>
                                             <div className="w-full bg-slate-100 rounded-full h-3 mb-6">
                                                <div style={{ width: `${course.progress}%` }} className="bg-brand-600 h-3 rounded-full relative overflow-hidden">
                                                   <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]"></div>
                                                </div>
                                             </div>

                                             <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                                                <div className="text-center">
                                                   <div className="flex items-center justify-center text-slate-400 mb-1"><Clock size={16} /></div>
                                                   <p className="font-bold text-slate-900">{details.totalTimeSpent}</p>
                                                   <p className="text-xs text-slate-500">Time Spent</p>
                                                </div>
                                                <div className="text-center border-l border-slate-100">
                                                   <div className="flex items-center justify-center text-slate-400 mb-1"><HelpCircle size={16} /></div>
                                                   <p className="font-bold text-slate-900">{details.quizAverage}</p>
                                                   <p className="text-xs text-slate-500">Quiz Avg.</p>
                                                </div>
                                                <div className="text-center border-l border-slate-100">
                                                   <div className="flex items-center justify-center text-slate-400 mb-1"><Award size={16} /></div>
                                                   <p className="font-bold text-slate-900">{course.progress === 100 ? 'Yes' : 'No'}</p>
                                                   <p className="text-xs text-slate-500">Certified</p>
                                                </div>
                                             </div>
                                          </div>
                                       </div>

                                       {/* Curriculum / Modules */}
                                       <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                          <div className="p-6 border-b border-slate-100">
                                             <h3 className="font-bold text-slate-900 text-lg">Curriculum Progress</h3>
                                          </div>
                                          <div className="divide-y divide-slate-100">
                                             {details.modules.map((module: any, idx: number) => (
                                                <div key={idx} className={`p-4 flex items-center gap-4 transition-colors ${module.current ? 'bg-brand-50' : 'hover:bg-slate-50'}`}>
                                                   <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${module.status === 'Completed' ? 'bg-green-100 text-green-600' :
                                                      module.status === 'In Progress' ? 'bg-brand-100 text-brand-600' :
                                                         'bg-slate-100 text-slate-400'
                                                      }`}>
                                                      {module.status === 'Completed' ? <CheckCircle size={20} /> :
                                                         module.status === 'In Progress' ? <PlayCircle size={20} /> : <Lock size={20} />}
                                                   </div>

                                                   <div className="flex-grow">
                                                      <div className="flex justify-between items-center mb-1">
                                                         <h4 className={`font-bold text-sm ${module.status === 'Locked' ? 'text-slate-400' : 'text-slate-900'}`}>
                                                            Module {idx + 1}: {module.title}
                                                         </h4>
                                                         <span className={`text-xs font-bold px-2 py-0.5 rounded ${module.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                            module.status === 'In Progress' ? 'bg-brand-100 text-brand-700' :
                                                               'bg-slate-100 text-slate-500'
                                                            }`}>
                                                            {module.status}
                                                         </span>
                                                      </div>
                                                      <div className="flex gap-4 text-xs text-slate-500">
                                                         <span className="flex items-center gap-1"><BookOpen size={12} /> {module.lessons} Lessons</span>
                                                         <span className="flex items-center gap-1"><Clock size={12} /> {module.duration}</span>
                                                         {module.score !== '-' && (
                                                            <span className="flex items-center gap-1 font-medium text-slate-700">Quiz Score: {module.score}</span>
                                                         )}
                                                      </div>
                                                   </div>
                                                </div>
                                             ))}
                                          </div>
                                       </div>
                                    </div>

                                    {/* Sidebar Info */}
                                    <div className="space-y-6">
                                       <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                                          <h3 className="font-bold text-slate-900 mb-4">Instructor</h3>
                                          <div className="flex items-center gap-3 mb-4">
                                             <div className="w-12 h-12 rounded-full bg-slate-200">
                                                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=EBF4FF&color=2563EB`} alt={course.instructor} className="w-full h-full rounded-full" />
                                             </div>
                                             <div>
                                                <p className="font-bold text-slate-900 text-sm">{course.instructor}</p>
                                                <p className="text-xs text-slate-500">Senior Instructor</p>
                                             </div>
                                          </div>
                                          <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                                       </div>

                                       <div className="bg-brand-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                                          <h3 className="font-bold text-lg mb-2 relative z-10">Keep going! 🚀</h3>
                                          <p className="text-brand-100 text-sm mb-4 relative z-10">
                                             You are doing great. Finish the next module to unlock a new badge.
                                          </p>
                                          <Button size="sm" className="w-full bg-white text-brand-600 hover:bg-brand-50 border-none relative z-10">
                                             Continue Learning
                                          </Button>
                                       </div>

                                       {course.progress === 100 && (
                                          <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6 text-center">
                                             <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Award size={32} />
                                             </div>
                                             <h3 className="font-bold text-slate-900 mb-2">Congratulations!</h3>
                                             <p className="text-sm text-slate-500 mb-4">You have successfully completed this course.</p>
                                             <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white border-none">
                                                Download Certificate
                                             </Button>
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              );
                           })()}
                        </div>
                     )}
                  </div>
               )}

               {/* Assignments Tab */}
               {activeTab === 'assignments' && (
                  <div className="max-w-4xl mx-auto animate-fade-in-up">
                     <div className="flex justify-between items-center mb-8">
                        <div>
                           <h2 className="text-2xl font-bold text-slate-900">Assignments</h2>
                           <p className="text-slate-500">Track your tasks, quizzes, and project submissions.</p>
                        </div>
                     </div>

                     <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full">
                           <thead className="bg-slate-50 border-b border-slate-200 text-left">
                              <tr>
                                 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Assignment Name</th>
                                 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Course</th>
                                 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Due Date</th>
                                 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Grade</th>
                                 <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-100">
                              {STUDENT_PROFILE.assignments.map((assignment) => (
                                 <tr key={assignment.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                       <div className="font-bold text-slate-900 text-sm">{assignment.title}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{assignment.course}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{assignment.dueDate}</td>
                                    <td className="px-6 py-4">
                                       <span className={`px-2 py-1 rounded-full text-xs font-bold ${assignment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                          assignment.status === 'Submitted' ? 'bg-blue-100 text-blue-700' :
                                             'bg-green-100 text-green-700'
                                          }`}>
                                          {assignment.status}
                                       </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{assignment.grade}</td>
                                    <td className="px-6 py-4 text-right">
                                       {assignment.status === 'Pending' && (
                                          <Button size="sm" variant="outline">Submit</Button>
                                       )}
                                       {assignment.status === 'Submitted' && (
                                          <span className="text-xs text-slate-400 italic">Under Review</span>
                                       )}
                                       {assignment.status === 'Graded' && (
                                          <Button size="sm" variant="ghost" className="text-brand-600">View Feedback</Button>
                                       )}
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                        {STUDENT_PROFILE.assignments.length === 0 && (
                           <div className="p-8 text-center text-slate-500">
                              No assignments found.
                           </div>
                        )}
                     </div>
                  </div>
               )}

               {/* Certificates Tab */}
               {activeTab === 'certificates' && (
                  <div className="max-w-4xl mx-auto animate-fade-in-up">
                     <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900">My Certificates</h2>
                        <p className="text-slate-500">Verified credentials for your completed courses.</p>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {STUDENT_PROFILE.certificates.map((cert) => (
                           <div key={cert.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col">
                              <div className="flex items-start justify-between mb-6">
                                 <div className="p-3 bg-brand-50 text-brand-600 rounded-lg">
                                    <Award size={32} />
                                 </div>
                                 <div className="text-right">
                                    <p className="text-xs text-slate-400 font-medium">Issued On</p>
                                    <p className="text-sm font-bold text-slate-900">{cert.date}</p>
                                 </div>
                              </div>

                              <div className="mb-6 flex-grow">
                                 <h3 className="text-lg font-bold text-slate-900 mb-2">{cert.course}</h3>
                                 <p className="text-sm text-slate-500">Credential ID: <span className="font-mono text-slate-700">{cert.id_code}</span></p>
                              </div>

                              <div className="flex gap-3">
                                 <Button className="flex-1" size="sm">
                                    <Download size={16} className="mr-2" /> Download PDF
                                 </Button>
                                 <Button variant="outline" className="flex-1" size="sm">
                                    Share
                                 </Button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {/* Schedule Tab */}
               {activeTab === 'schedule' && (
                  <div className="max-w-4xl mx-auto animate-fade-in-up">
                     <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900">My Schedule</h2>
                        <p className="text-slate-500">Upcoming classes, deadlines, and events.</p>
                     </div>

                     <div className="space-y-4">
                        {STUDENT_PROFILE.schedule.map((item) => (
                           <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex-shrink-0 w-16 h-16 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                                 <span className="text-xs text-slate-500 font-bold uppercase">{item.date.split(' ')[0].substring(0, 3)}</span>
                                 <span className="text-xl font-bold text-slate-900">{item.date.match(/\d+/) || '12'}</span>
                              </div>

                              <div className="flex-grow">
                                 <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${item.type === 'Live Class' ? 'bg-red-100 text-red-700' :
                                       item.type === 'Deadline' ? 'bg-orange-100 text-orange-700' :
                                          'bg-blue-100 text-blue-700'
                                       }`}>
                                       {item.type}
                                    </span>
                                    <span className="text-xs text-slate-400 flex items-center"><Clock size={12} className="mr-1" /> {item.time}</span>
                                 </div>
                                 <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                                 <p className="text-sm text-slate-500 mt-1">Instructor: {item.instructor}</p>
                              </div>

                              <div className="flex-shrink-0">
                                 {item.type === 'Live Class' ? (
                                    <Button className="bg-red-600 hover:bg-red-700 border-none"><Video size={16} className="mr-2" /> Join Class</Button>
                                 ) : (
                                    <Button variant="outline" onClick={() => setSelectedScheduleItem(item)}>View Details</Button>
                                 )}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {/* Settings Tab */}
               {activeTab === 'settings' && (
                  <div className="max-w-2xl mx-auto animate-fade-in-up">
                     <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900">Account Settings</h2>
                        <p className="text-slate-500">Manage your profile and preferences.</p>
                     </div>

                     <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
                        <h3 className="font-bold text-slate-900 mb-6">Profile Information</h3>
                        <div className="flex items-center gap-6 mb-6">
                           <div className="w-20 h-20 rounded-full bg-brand-600 text-white flex items-center justify-center text-3xl font-bold">
                              {STUDENT_PROFILE.avatar}
                           </div>
                           <div>
                              <Button variant="outline" size="sm" className="mb-2">Change Avatar</Button>
                              <p className="text-xs text-slate-400">JPG, GIF or PNG. Max size of 800K</p>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                              <input type="text" defaultValue={STUDENT_PROFILE.name} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
                           </div>
                           <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                              <input type="email" defaultValue={STUDENT_PROFILE.email} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-slate-50" disabled />
                           </div>
                           <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                              <textarea rows={3} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none" placeholder="Tell us a little about yourself..."></textarea>
                           </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-slate-100 text-right">
                           <Button>Save Changes</Button>
                        </div>
                     </div>

                     <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="font-bold text-slate-900 mb-6">Notifications</h3>
                        <div className="space-y-4">
                           {['Email notifications for new assignments', 'Weekly progress report', 'Promotional offers and course recommendations'].map((label, i) => (
                              <div key={i} className="flex items-center justify-between">
                                 <span className="text-slate-700 text-sm">{label}</span>
                                 <input type="checkbox" defaultChecked={i < 2} className="h-4 w-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500" />
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               )}

            </div>
         </main>
      </div>
   );
};
