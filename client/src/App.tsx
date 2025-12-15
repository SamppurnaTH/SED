
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as ReactRouterDOM from 'react-router-dom';
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
    <TopCourses onNavigate={onNavigate} onViewInstructor={(name) => { }} />
    <WhyChooseUs />
    <Partners />
    <CTASection onNavigate={onNavigate} />
  </>
);

const App: React.FC = () => {
  const navigate = ReactRouterDOM.useNavigate();
  const location = ReactRouterDOM.useLocation();

  // Helper to convert path to view state
  const getViewFromPath = (path: string): ViewState => {
    // Handle specific routes
    if (path === '/') return 'home';
    if (path.startsWith('/verify-email')) return 'verify-email';

    const cleanPath = path.substring(1); // Remove leading slash

    // Check if path matches any valid ViewState
    const validViews: ViewState[] = [
      'courses', 'services', 'service-detail', 'about', 'contact',
      'get-started', 'login', 'forgot-password', 'reset-password',
      'instructor', 'admin', 'student', 'student-dashboard',
      'instructor-dashboard', 'privacy', 'terms', 'success-stories',
      'notifications', 'connection-test'
    ];

    if (validViews.includes(cleanPath as ViewState)) {
      return cleanPath as ViewState;
    }

    return 'home';
  };

  // Helper to convert view state to path
  const getPathFromView = (view: ViewState): string => {
    if (view === 'home') return '/';
    return `/${view}`;
  };

  const [currentView, setCurrentView] = useState<ViewState>(() => getViewFromPath(location.pathname));
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');

  // Sync state with URL when location changes (e.g. back button)
  useEffect(() => {
    const newView = getViewFromPath(location.pathname);
    if (newView !== currentView) {
      setCurrentView(newView);
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Handle navigation by updating URL
  const handleNavigate = (view: ViewState) => {
    if (view !== currentView) {
      navigate(getPathFromView(view));
    }
  };

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
                <Header onNavigate={handleNavigate} currentView={currentView} />}

              {['get-started', 'login', 'forgot-password', 'reset-password'].includes(currentView) && (
                <div className="absolute top-0 left-0 w-full p-6 z-50 lg:hidden">
                  <div className="flex items-center justify-between">
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('home'); }} className="text-2xl font-display font-bold text-brand-600 tracking-tight">
                      SED<span className="text-slate-800">.</span>
                    </a>
                    <button onClick={() => handleNavigate('home')} className="text-slate-500 hover:text-slate-900">Back to Home</button>
                  </div>
                </div>
              )}

              <main className="flex-grow">
                {currentView === 'home' && <HomePage onNavigate={handleNavigate} />}
                {currentView === 'courses' && <CoursesPage onNavigate={handleNavigate} onViewInstructor={() => { }} />}
                {currentView === 'services' && <ServicesPage onNavigate={handleNavigate} onViewService={(id) => { setSelectedServiceId(id); handleNavigate('service-detail'); }} />}
                {currentView === 'service-detail' && <ServiceDetailPage serviceId={selectedServiceId} onNavigate={handleNavigate} />}
                {currentView === 'about' && <AboutPage onNavigate={handleNavigate} />}
                {currentView === 'contact' && <ContactPage />}
                {currentView === 'get-started' && <GetStartedPage onNavigate={handleNavigate} />}
                {currentView === 'login' && <LoginPage onNavigate={handleNavigate} />}
                {currentView === 'forgot-password' && <ForgotPasswordPage onNavigate={handleNavigate} />}
                {currentView === 'reset-password' && <ResetPasswordPage onNavigate={handleNavigate} />}
                {currentView === 'admin' && <AdminDashboard onNavigate={handleNavigate} />}
                {currentView === 'student' && <StudentDashboard onNavigate={handleNavigate} />}
                {currentView === 'instructor-dashboard' && <InstructorDashboard onNavigate={handleNavigate} />}
                {currentView === 'privacy' && <PrivacyPolicyPage onNavigate={handleNavigate} />}
                {currentView === 'terms' && <TermsOfServicePage onNavigate={handleNavigate} />}
                {currentView === 'success-stories' && <SuccessStoriesPage onNavigate={handleNavigate} />}
                {currentView === 'notifications' && <NotificationsPage onNavigate={handleNavigate} />}
                {currentView === 'connection-test' && <ConnectionTestPage />}
              </main>

              {!['get-started', 'login', 'forgot-password', 'reset-password'].includes(currentView) &&
                !['admin', 'student', 'instructor-dashboard'].includes(currentView) &&
                <Footer onNavigate={handleNavigate} />}

              {!['admin', 'student', 'instructor-dashboard'].includes(currentView) && <Chatbot />}
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
