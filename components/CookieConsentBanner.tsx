
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent_choice');
      if (!consent) {
        setIsVisible(true);
      }
    } catch (error) {
      console.error("Could not access localStorage:", error);
      // Fallback: show the banner if localStorage is unavailable
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (choice: 'accepted' | 'declined') => {
    try {
      localStorage.setItem('cookie_consent_choice', choice);
    } catch (error) {
      console.error("Could not write to localStorage:", error);
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-primary/90 backdrop-blur-md text-secondary p-5 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)] z-50 animate-slide-up"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie Consent Banner"
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center sm:text-left">
          We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies. Read our{' '}
          <Link to="/cookie-policy" className="font-semibold underline hover:text-white transition-colors">Cookie Policy</Link>.
        </p>
        <div className="flex-shrink-0 flex gap-3">
          <button
            onClick={() => handleConsent('declined')}
            className="font-poppins font-semibold py-2 px-5 rounded-lg bg-transparent border-2 border-secondary/50 text-secondary/80 hover:bg-secondary/10 hover:border-secondary hover:text-secondary transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => handleConsent('accepted')}
            className="font-poppins font-bold py-2 px-5 rounded-lg bg-secondary text-primary hover:opacity-90 transition-opacity"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;