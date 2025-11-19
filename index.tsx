import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { SavedCoursesProvider } from './contexts/SavedCoursesContext';
import { AuthProvider } from './contexts/AuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { PartnersProvider } from './contexts/PartnersContext';
import { ServicesProvider } from './contexts/ServicesContext';
import { ContactSubmissionsProvider } from './contexts/ContactSubmissionsContext';
import { CoursesProvider } from './contexts/CoursesContext';
import { UserProgressProvider } from './contexts/UserProgressContext';
import { BlogProvider } from './contexts/BlogContext';
import { ToastProvider } from './contexts/ToastContext';
import analytics from './services/analytics';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Initialize performance monitoring for the application
analytics.initPerformanceMonitoring();

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <AdminAuthProvider>
            <ToastProvider>
              <PartnersProvider>
                <ServicesProvider>
                  <ContactSubmissionsProvider>
                    <CoursesProvider>
                      <SavedCoursesProvider>
                        <UserProgressProvider>
                          <BlogProvider>
                            <App />
                          </BlogProvider>
                        </UserProgressProvider>
                      </SavedCoursesProvider>
                    </CoursesProvider>
                  </ContactSubmissionsProvider>
                </ServicesProvider>
              </PartnersProvider>
            </ToastProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);