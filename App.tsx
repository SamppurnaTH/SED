import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Chatbot from './components/Chatbot';
import CookieConsentBanner from './components/CookieConsentBanner';
import PageLoader from './components/PageLoader';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

// Lazy-loaded components
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ProgramsPage = React.lazy(() => import('./pages/ProgramsPage'));
const CourseDetailPage = React.lazy(() => import('./pages/CourseDetailPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('./pages/ResetPasswordPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const PartnersPage = React.lazy(() => import('./pages/PartnersPage'));
const ServiceDetailPage = React.lazy(() => import('./pages/ServiceDetailPage'));
const PartnerDetailPage = React.lazy(() => import('./pages/PartnerDetailPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const OrderConfirmationPage = React.lazy(() => import('./pages/OrderConfirmationPage'));
const CookiePolicyPage = React.lazy(() => import('./pages/CookiePolicyPage'));
const TermsAndConditionsPage = React.lazy(() => import('./pages/TermsAndConditionsPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));
const AIResumeBuilderPage = React.lazy(() => import('./pages/AIResumeBuilderPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const LessonPage = React.lazy(() => import('./pages/LessonPage'));

// Admin Imports (Lazy-loaded)
const AdminDashboardPage = React.lazy(() => import('./pages/AdminDashboardPage'));
const AdminPartnersPage = React.lazy(() => import('./pages/AdminPartnersPage'));
const AdminPartnerFormPage = React.lazy(() => import('./pages/AdminPartnerFormPage'));
const AdminServicesPage = React.lazy(() => import('./pages/AdminServicesPage'));
const AdminServiceFormPage = React.lazy(() => import('./pages/AdminServiceFormPage'));
const AdminSubmissionsPage = React.lazy(() => import('./pages/AdminSubmissionsPage'));
const AdminCoursesPage = React.lazy(() => import('./pages/AdminCoursesPage'));
const AdminCourseFormPage = React.lazy(() => import('./pages/AdminCourseFormPage'));
const AdminVideoGenerationPage = React.lazy(() => import('./pages/AdminVideoGenerationPage'));
const AdminContentGenerationPage = React.lazy(() => import('./pages/AdminContentGenerationPage'));
const TrainerDashboardPage = React.lazy(() => import('./pages/TrainerDashboardPage'));
const AdminAnalyticsPage = React.lazy(() => import('./pages/AdminAnalyticsPage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage'));
const AdminBlogPage = React.lazy(() => import('./pages/AdminBlogPage'));
const AdminBlogFormPage = React.lazy(() => import('./pages/AdminBlogFormPage'));


const App: React.FC = () => {
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password'].some(path => location.pathname.startsWith(path));
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/trainer');
  const isLessonPage = location.pathname.startsWith('/learning/');
  const showHeaderFooter = !isAuthPage && !isAdminPage && !isLessonPage;

  // Effect to handle scrolling when the page or hash changes
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      // Use setTimeout to allow the page to render before scrolling
      setTimeout(() => {
        const id = hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Scroll to the top of the page on new page navigation
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const checkScrollTop = () => {
      // Show button when page is scrolled past 400px
      setShowScrollTop(window.pageYOffset > 400);
    };

    window.addEventListener('scroll', checkScrollTop);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []); // Empty dependency array ensures this effect runs only once

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-text-primary font-inter">
      <ErrorBoundary>
        <a 
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 bg-accent text-white focus:rounded-lg focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        {showHeaderFooter && <Header />}
        <main id="main-content">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* User-facing routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/programs/:courseSlug" element={<CourseDetailPage />} />
                <Route path="/programs" element={<ProgramsPage />} />
                <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/partners/:partnerSlug" element={<PartnerDetailPage />} />
                <Route path="/partners" element={<PartnersPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />

                {/* Legal Pages */}
                <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:resetToken" element={<ResetPasswordPage />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/resume-builder"
                  element={
                    <ProtectedRoute>
                      <AIResumeBuilderPage />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/learning/:courseSlug"
                  element={
                    <ProtectedRoute>
                      <LessonPage />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/programs/:courseSlug/checkout" 
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/order-confirmation" 
                  element={
                    <ProtectedRoute>
                      <OrderConfirmationPage />
                    </ProtectedRoute>
                  } 
                />

                {/* Admin routes */}
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <AdminProtectedRoute>
                      <AdminDashboardPage />
                    </AdminProtectedRoute>
                  } 
                />
                {/* ... (rest of admin routes) ... */}
                <Route 
                  path="/admin/analytics" 
                  element={
                    <AdminProtectedRoute>
                      <AdminAnalyticsPage />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/partners" 
                  element={
                    <AdminProtectedRoute>
                      <AdminPartnersPage />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/partners/new" 
                  element={
                    <AdminProtectedRoute>
                      <AdminPartnerFormPage />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/partners/edit/:partnerSlug" 
                  element={
                    <AdminProtectedRoute>
                      <AdminPartnerFormPage />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/services" 
                  element={
                    <AdminProtectedRoute>
                      <AdminServicesPage />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/services/new" 
                  element={
                    <AdminProtectedRoute>
                      <AdminServiceFormPage />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/services/edit/:serviceSlug" 
                  element={
                    <AdminProtectedRoute>
                      <AdminServiceFormPage />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/submissions" 
                  element={
                    <AdminProtectedRoute>
                      <AdminSubmissionsPage />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/courses" 
                  element={
                    <AdminProtectedRoute>
                      <AdminCoursesPage />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/courses/new" 
                  element={
                    <AdminProtectedRoute>
                      <AdminCourseFormPage />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/courses/edit/:courseSlug" 
                  element={
                    <AdminProtectedRoute>
                      <AdminCourseFormPage />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/videos" 
                  element={
                    <AdminProtectedRoute>
                      <AdminVideoGenerationPage />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/content-generator" 
                  element={
                    <AdminProtectedRoute>
                      <AdminContentGenerationPage />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/blog" 
                  element={
                    <AdminProtectedRoute>
                      <AdminBlogPage />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/blog/new" 
                  element={
                    <AdminProtectedRoute>
                      <AdminBlogFormPage />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/blog/edit/:slug" 
                  element={
                    <AdminProtectedRoute>
                      <AdminBlogFormPage />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="/trainer/dashboard" 
                  element={
                    <AdminProtectedRoute>
                      <TrainerDashboardPage />
                    </AdminProtectedRoute>
                  } 
                />

                {/* 404 Not Found Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
        </main>
        {showHeaderFooter && <Footer />}
        
        {!isAdminPage && !isLessonPage && <Chatbot />}
        
        <CookieConsentBanner />

        {showScrollTop && (
          <button
            onClick={scrollTop}
            className="fixed bottom-8 right-8 bg-accent text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all z-40"
            aria-label="Scroll to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default App;