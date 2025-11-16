
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import ServicesPage from './pages/ServicesPage';
import PartnersPage from './pages/PartnersPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PartnerDetailPage from './pages/PartnerDetailPage';
import ContactPage from './pages/ContactPage';
// Admin Imports
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminPartnersPage from './pages/AdminPartnersPage';
import AdminPartnerFormPage from './pages/AdminPartnerFormPage';
import AdminServicesPage from './pages/AdminServicesPage';
import AdminServiceFormPage from './pages/AdminServiceFormPage';
import AdminSubmissionsPage from './pages/AdminSubmissionsPage';
import AdminCoursesPage from './pages/AdminCoursesPage';
import AdminCourseFormPage from './pages/AdminCourseFormPage';

const App: React.FC = () => {
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password'].includes(location.pathname);
  const isAdminPage = location.pathname.startsWith('/admin');
  const showHeaderFooter = !isAuthPage && !isAdminPage;

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
    <div className="bg-white text-dark-gray font-inter">
      {showHeaderFooter && <Header />}
      <main>
        <ErrorBoundary>
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
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
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </main>
      {showHeaderFooter && <Footer />}
      {showScrollTop && showHeaderFooter && (
        <button
          onClick={scrollTop}
          className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;