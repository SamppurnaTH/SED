
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourses } from '../contexts/CoursesContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import Logo from '../components/icons/Logo';

const LessonPage: React.FC = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const navigate = useNavigate();
  const { getCourseBySlug } = useCourses();
  const { enrolledCourses, markLessonComplete, isLessonCompleted } = useUserProgress();
  
  const course = getCourseBySlug(courseSlug || '');
  
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Redirect if not enrolled
  useEffect(() => {
      if (enrolledCourses.length > 0 && !enrolledCourses.some(c => c.courseSlug === courseSlug)) {
          navigate('/dashboard');
      }
  }, [enrolledCourses, courseSlug, navigate]);

  if (!course) return <div>Loading course...</div>;

  const currentLessonId = `${activeWeekIndex}-${activeTopicIndex}`;
  const isCompleted = isLessonCompleted(course.slug, currentLessonId);
  const currentWeek = course.curriculum[activeWeekIndex];
  const currentTopic = currentWeek?.topics[activeTopicIndex];

  const handleMarkComplete = async () => {
      await markLessonComplete(course.slug, currentLessonId);
      
      // Auto-advance
      if (activeTopicIndex < currentWeek.topics.length - 1) {
          setActiveTopicIndex(activeTopicIndex + 1);
      } else if (activeWeekIndex < course.curriculum.length - 1) {
          setActiveWeekIndex(activeWeekIndex + 1);
          setActiveTopicIndex(0);
      }
  };
  
  const getEmbedUrl = (url?: string) => {
      if (!url) return null;
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
          const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
          return `https://www.youtube.com/embed/${videoId}`;
      }
      return url; // Assume direct MP4 or other embeddable URL
  };

  const videoSrc = getEmbedUrl(currentTopic?.videoUrl);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-30">
          <div className="flex items-center gap-3">
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                 <svg className="w-6 h-6 text-dark-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
             </button>
             <Logo className="h-6 w-6" />
          </div>
          <Link to="/dashboard" className="text-sm font-semibold text-primary">Dashboard</Link>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 w-80 bg-white border-r border-gray-200 flex flex-col z-20 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} mt-16 lg:mt-0`}>
        <div className="hidden lg:flex p-4 border-b border-gray-200 items-center justify-between">
           <Link to="/dashboard" className="flex items-center gap-2 text-dark-gray hover:text-primary font-semibold text-sm">
              ← Back to Dashboard
           </Link>
        </div>
        <div className="p-4 bg-primary/5 border-b border-gray-200">
            <h2 className="font-bold text-primary truncate">{course.name}</h2>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${enrolledCourses.find(c => c.courseSlug === course.slug)?.progress || 0}%` }}></div>
            </div>
            <p className="text-xs text-dark-gray/60 mt-1 text-right">{enrolledCourses.find(c => c.courseSlug === course.slug)?.progress || 0}% Complete</p>
        </div>
        
        <div className="flex-grow overflow-y-auto">
            {course.curriculum.map((week, wIndex) => (
                <div key={wIndex} className="border-b border-gray-100">
                    <div className="px-4 py-3 bg-gray-50 font-semibold text-sm text-dark-gray">Week {week.week}: {week.title}</div>
                    <div>
                        {week.topics.map((topic, tIndex) => {
                            const lessonId = `${wIndex}-${tIndex}`;
                            const isDone = isLessonCompleted(course.slug, lessonId);
                            const isActive = wIndex === activeWeekIndex && tIndex === activeTopicIndex;
                            return (
                                <button
                                    key={tIndex}
                                    onClick={() => { setActiveWeekIndex(wIndex); setActiveTopicIndex(tIndex); if(window.innerWidth < 1024) setIsSidebarOpen(false); }}
                                    className={`w-full text-left px-4 py-3 text-sm flex items-start gap-3 transition-colors ${isActive ? 'bg-primary/10 text-primary font-medium border-l-4 border-primary' : 'text-dark-gray/80 hover:bg-gray-50'}`}
                                >
                                    <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${isDone ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}>
                                        {isDone && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                    <span className={isDone ? 'text-dark-gray/50 line-through' : ''}>{topic.title}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col overflow-y-auto mt-16 lg:mt-0 w-full">
        <header className="hidden lg:flex h-16 bg-white border-b border-gray-200 items-center justify-between px-8 flex-shrink-0">
            <div className="flex items-center gap-3">
                <Logo className="h-8 w-8" />
                <span className="text-gray-300">|</span>
                <h1 className="font-bold text-dark-gray truncate">{currentTopic?.title}</h1>
            </div>
             <div className="flex gap-3">
                 <button 
                    onClick={handleMarkComplete}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors ${isCompleted ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-accent'}`}
                 >
                     {isCompleted ? 'Completed' : 'Mark as Complete'}
                 </button>
             </div>
        </header>

        <div className="p-4 lg:p-8 max-w-5xl mx-auto w-full">
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-xl shadow-lg overflow-hidden relative">
                 {videoSrc ? (
                     <iframe 
                        src={videoSrc} 
                        className="w-full h-full" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        title={currentTopic?.title}
                     ></iframe>
                 ) : (
                     <div className="absolute inset-0 flex items-center justify-center flex-col text-white/50">
                          <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                          <p>No video content available for this lesson.</p>
                     </div>
                 )}
            </div>
            
            {/* Mobile Title & Complete Button */}
            <div className="lg:hidden mt-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-dark-gray">{currentTopic?.title}</h1>
                <button 
                    onClick={handleMarkComplete}
                    className={`w-full px-4 py-3 rounded-lg text-sm font-semibold text-white transition-colors ${isCompleted ? 'bg-green-500' : 'bg-primary'}`}
                >
                     {isCompleted ? 'Completed' : 'Mark as Complete'}
                </button>
            </div>

            <div className="mt-8 grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-dark-gray mb-4">Lesson Notes</h3>
                    <div className="prose max-w-none text-dark-gray/80 whitespace-pre-wrap">
                        {currentTopic?.content || "No textual content available for this lesson."}
                    </div>
                </div>
                <div className="lg:col-span-1 space-y-6">
                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                         <h4 className="font-bold text-dark-gray mb-4">Instructor</h4>
                         <div className="flex items-center gap-3">
                             <img src={course.instructor.imageUrl} alt={course.instructor.name} className="w-12 h-12 rounded-full object-cover" />
                             <div>
                                 <p className="font-semibold text-sm">{course.instructor.name}</p>
                                 <p className="text-xs text-gray-500">{course.instructor.title}</p>
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default LessonPage;
