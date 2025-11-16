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

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <AdminAuthProvider>
          <PartnersProvider>
            <ServicesProvider>
              <ContactSubmissionsProvider>
                <CoursesProvider>
                  <SavedCoursesProvider>
                    <App />
                  </SavedCoursesProvider>
                </CoursesProvider>
              </ContactSubmissionsProvider>
            </ServicesProvider>
          </PartnersProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);