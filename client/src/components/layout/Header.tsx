
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../constants';
import { Button } from '../ui/Button';
import { ViewState } from '../../App';

interface HeaderProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === '#courses') {
      onNavigate('courses');
    } else if (href === '#services') {
      onNavigate('services');
    } else if (href === '#about') {
      onNavigate('about');
    } else if (href === '#contact') {
      onNavigate('contact');
    } else {
      onNavigate('home');
      // Small delay to allow rendering home before scrolling
      if (href !== '#home') {
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className="text-2xl font-display font-bold text-brand-600 tracking-tight"
            >
              SED<span className="text-slate-800">.</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`text-sm font-medium transition-colors ${((link.href === '#courses' && currentView === 'courses') ||
                  (link.href === '#services' && currentView === 'services') ||
                  (link.href === '#about' && currentView === 'about') ||
                  (link.href === '#contact' && currentView === 'contact') ||
                  (link.href === '#home' && currentView === 'home' && window.scrollY < 100))
                  ? 'text-brand-600'
                  : 'text-slate-600 hover:text-brand-600'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onNavigate('login')}
              className="text-slate-600 font-medium hover:text-brand-600 transition-colors"
            >
              Log in
            </button>
            <Button size="sm" onClick={() => onNavigate('get-started')}>Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-base font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-md"
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 px-3 space-y-3">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => { setIsMobileMenuOpen(false); onNavigate('login'); }}
              >
                Log in
              </Button>
              <Button className="w-full" onClick={() => { setIsMobileMenuOpen(false); onNavigate('get-started'); }}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

