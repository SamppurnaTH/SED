
import React, { useState, useEffect } from 'react';
// Layout Components
import { Header, Footer, Hero } from './components/layout';
// Common Components
import { WhyChooseUs, Partners, CTASection } from './components/common';
// Features
import { TopCourses, CoursesPage } from './features/courses';
import { ServicesPage, ServiceDetailPage, Chatbot } from './features/services';
import { AdminDashboard, StudentDashboard, InstructorDashboard, InstructorProfilePage, NotificationsPage } from './features/dashboard';
import { LoginPage, ForgotPasswordPage, ResetPasswordPage } from './features/auth';
// Pages
import { AboutPage, ContactPage, GetStartedPage, PrivacyPolicyPage, TermsOfServicePage, SuccessStoriesPage } from './pages';
import ConnectionTestPage from './pages/ConnectionTestPage';

export type ViewState = 'home' | 'courses' | 'services' | 'service-detail' | 'about' | 'contact' | 'get-started' | 'login' | 'forgot-password' | 'reset-password' | 'instructor' | 'admin' | 'student' | 'instructor-dashboard' | 'privacy' | 'terms' | 'success-stories' | 'notifications' | 'connection-test';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedInstructor, setSelectedInstructor] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedInstructor, selectedServiceId]);

  const isAuthPage = currentView === 'get-started' || currentView === 'login' || currentView === 'forgot-password' || currentView === 'reset-password';
  const isDashboardPage = currentView === 'admin' || currentView === 'student' || currentView === 'instructor-dashboard';

  const handleInstructorView = (name: string) => {
    setSelectedInstructor(name);
    setCurrentView('instructor');
  };

  const handleServiceView = (id: string) => {
    setSelectedServiceId(id);
    setCurrentView('service-detail');
  };

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      {!isAuthPage && !isDashboardPage && <Header onNavigate={setCurrentView} currentView={currentView} />}
      
      {/* Special Minimal Navigation for Auth Pages */}
      {isAuthPage && (
         <div className="absolute top-0 left-0 w-full p-6 z-50 lg:hidden">
            <div className="flex items-center justify-between">
               <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }} className="text-2xl font-display font-bold text-brand-600 tracking-tight">
                 SED<span className="text-slate-800">.</span>
               </a>
               <button onClick={() => setCurrentView('home')} className="text-slate-500 hover:text-slate-900">Back to Home</button>
            </div>
         </div>
      )}

      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero onNavigate={setCurrentView} />
            <TopCourses onNavigate={setCurrentView} onViewInstructor={handleInstructorView} />
            <WhyChooseUs />
            <Partners />
            <CTASection onNavigate={setCurrentView} />
          </>
        )}
        {currentView === 'courses' && (
          <CoursesPage onNavigate={setCurrentView} onViewInstructor={handleInstructorView} />
        )}
        {currentView === 'services' && (
          <ServicesPage onNavigate={setCurrentView} onViewService={handleServiceView} />
        )}
        {currentView === 'service-detail' && (
          <ServiceDetailPage serviceId={selectedServiceId} onNavigate={setCurrentView} />
        )}
        {currentView === 'about' && <AboutPage onNavigate={setCurrentView} />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'get-started' && <GetStartedPage onNavigate={setCurrentView} />}
        {currentView === 'login' && <LoginPage onNavigate={setCurrentView} />}
        {currentView === 'forgot-password' && <ForgotPasswordPage onNavigate={setCurrentView} />}
        {currentView === 'reset-password' && <ResetPasswordPage onNavigate={setCurrentView} />}
        {currentView === 'instructor' && (
          <InstructorProfilePage instructorName={selectedInstructor} onNavigate={setCurrentView} />
        )}
        {currentView === 'admin' && (
          <AdminDashboard onNavigate={setCurrentView} />
        )}
        {currentView === 'student' && (
          <StudentDashboard onNavigate={setCurrentView} />
        )}
        {currentView === 'instructor-dashboard' && (
          <InstructorDashboard onNavigate={setCurrentView} />
        )}
        {currentView === 'privacy' && <PrivacyPolicyPage onNavigate={setCurrentView} />}
        {currentView === 'terms' && <TermsOfServicePage onNavigate={setCurrentView} />}
        {currentView === 'success-stories' && <SuccessStoriesPage onNavigate={setCurrentView} />}
        {currentView === 'notifications' && <NotificationsPage onNavigate={setCurrentView} />}
        {currentView === 'connection-test' && <ConnectionTestPage />}
      </main>
      
      {!isAuthPage && !isDashboardPage && <Footer onNavigate={setCurrentView} />}
      
      {/* Chatbot Widget - Available globally unless explicitly hidden */}
      {!isDashboardPage && <Chatbot />}
    </div>
  );
};

export default App;
