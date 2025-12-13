
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import VerifyEmailPage from './pages/VerifyEmailPage';

export type ViewState = 'home' | 'courses' | 'services' | 'service-detail' | 'about' | 'contact' | 'get-started' | 'login' | 'verify-email' | 'forgot-password' | 'reset-password' | 'instructor' | 'admin' | 'student' | 'student-dashboard' | 'instructor-dashboard' | 'privacy' | 'terms' | 'success-stories' | 'notifications' | 'connection-test';

// Home Page Component
const HomePage = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => (
  <>
    <Hero onNavigate={onNavigate} />
    <TopCourses onNavigate={onNavigate} onViewInstructor={(name) => {}} />
    <WhyChooseUs />
    <Partners />
    <CTASection onNavigate={onNavigate} />
  </>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Routes>
        {/* Verify Email Route - Must be before other routes to match :token parameter */}
        <Route 
          path="/verify-email/:token" 
          element={
            <>
              <VerifyEmailPage />
            </>
          } 
        />
        
        {/* All other routes can use the legacy View state system */}
        <Route 
          path="/*" 
          element={
            <>
              {!['get-started', 'login', 'forgot-password', 'reset-password'].includes(currentView) && 
               !['admin', 'student', 'instructor-dashboard'].includes(currentView) && 
               <Header onNavigate={setCurrentView} currentView={currentView} />}
              
              {['get-started', 'login', 'forgot-password', 'reset-password'].includes(currentView) && (
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
                {currentView === 'home' && <HomePage onNavigate={setCurrentView} />}
                {currentView === 'courses' && <CoursesPage onNavigate={setCurrentView} onViewInstructor={() => {}} />}
                {currentView === 'services' && <ServicesPage onNavigate={setCurrentView} onViewService={() => {}} />}
                {currentView === 'about' && <AboutPage onNavigate={setCurrentView} />}
                {currentView === 'contact' && <ContactPage />}
                {currentView === 'get-started' && <GetStartedPage onNavigate={setCurrentView} />}
                {currentView === 'login' && <LoginPage onNavigate={setCurrentView} />}
                {currentView === 'forgot-password' && <ForgotPasswordPage onNavigate={setCurrentView} />}
                {currentView === 'reset-password' && <ResetPasswordPage onNavigate={setCurrentView} />}
                {currentView === 'admin' && <AdminDashboard onNavigate={setCurrentView} />}
                {currentView === 'student' && <StudentDashboard onNavigate={setCurrentView} />}
                {currentView === 'instructor-dashboard' && <InstructorDashboard onNavigate={setCurrentView} />}
                {currentView === 'privacy' && <PrivacyPolicyPage onNavigate={setCurrentView} />}
                {currentView === 'terms' && <TermsOfServicePage onNavigate={setCurrentView} />}
                {currentView === 'success-stories' && <SuccessStoriesPage onNavigate={setCurrentView} />}
                {currentView === 'notifications' && <NotificationsPage onNavigate={setCurrentView} />}
                {currentView === 'connection-test' && <ConnectionTestPage />}
              </main>

              {!['get-started', 'login', 'forgot-password', 'reset-password'].includes(currentView) && 
               !['admin', 'student', 'instructor-dashboard'].includes(currentView) && 
               <Footer onNavigate={setCurrentView} />}

              {!['admin', 'student', 'instructor-dashboard'].includes(currentView) && <Chatbot />}
            </>
          } 
        />
      </Routes>
    </div>
  );
};

export default App;
