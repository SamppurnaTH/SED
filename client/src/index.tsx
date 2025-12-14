import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}

// Use the Client ID from environment or fallback to the one from Google Cloud Console
// Make sure this Client ID has http://localhost:3000 added to Authorized redirect URIs
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '792583429379-cgm8l1amdff404ka9spr4pe5g3umrmmt.apps.googleusercontent.com';

console.log('Google OAuth Client ID:', GOOGLE_CLIENT_ID);

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <BrowserRouter>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
