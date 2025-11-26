

import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { ViewState } from '../../App';

interface FooterProps {
  onNavigate?: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, view: ViewState, id?: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(view);
      if (id && view === 'home') {
        setTimeout(() => {
          const el = document.querySelector(id);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div>
            <div className="flex justify-between items-center">
              <a 
                href="#" 
                onClick={(e) => handleNav(e, 'home')}
                className="text-2xl font-display font-bold text-white tracking-tight mb-6 block"
              >
                SED<span className="text-brand-600">.</span>
              </a>
              {import.meta.env.DEV && (
                <a 
                  href="#" 
                  onClick={(e) => handleNav(e, 'connection-test')}
                  className="text-xs bg-yellow-500 text-black px-2 py-1 rounded hover:bg-yellow-400 transition-colors"
                  title="Connection Test (Dev Only)"
                >
                  Test Connection
                </a>
              )}
            </div>
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              Scholastic A Edu. Depot is a premier EdTech platform dedicated to bridging the gap between academic learning and industry requirements.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="hover:text-brand-500 transition-colors"
                aria-label="Facebook"
                title="Visit our Facebook page"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="hover:text-brand-500 transition-colors"
                aria-label="Twitter"
                title="Visit our Twitter profile"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="hover:text-brand-500 transition-colors"
                aria-label="Instagram"
                title="Visit our Instagram profile"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="hover:text-brand-500 transition-colors"
                aria-label="LinkedIn"
                title="Visit our LinkedIn page"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#about" onClick={(e) => handleNav(e, 'about')} className="hover:text-brand-500 transition-colors">About Us</a></li>
              <li><a href="#courses" onClick={(e) => handleNav(e, 'courses')} className="hover:text-brand-500 transition-colors">Our Courses</a></li>
              <li><a href="#services" onClick={(e) => handleNav(e, 'services')} className="hover:text-brand-500 transition-colors">Our Services</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'success-stories')} className="hover:text-brand-500 transition-colors">Success Stories</a></li>
              <li><a href="#contact" onClick={(e) => handleNav(e, 'contact')} className="hover:text-brand-500 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white font-bold mb-6">Trending Courses</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#courses" onClick={(e) => handleNav(e, 'courses')} className="hover:text-brand-500 transition-colors">Full Stack Development</a></li>
              <li><a href="#courses" onClick={(e) => handleNav(e, 'courses')} className="hover:text-brand-500 transition-colors">Data Science & AI</a></li>
              <li><a href="#courses" onClick={(e) => handleNav(e, 'courses')} className="hover:text-brand-500 transition-colors">Python Programming</a></li>
              <li><a href="#courses" onClick={(e) => handleNav(e, 'courses')} className="hover:text-brand-500 transition-colors">Digital Marketing</a></li>
              <li><a href="#courses" onClick={(e) => handleNav(e, 'courses')} className="hover:text-brand-500 transition-colors">Cloud Computing</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-500 mt-0.5 flex-shrink-0" />
                <span>123 Tech Park, Innovation Blvd, Silicon Valley, CA 94043</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-500 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-500 flex-shrink-0" />
                <span>admissions@sed-edu.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center relative z-10">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Scholastic A Edu. Depot. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm relative z-10">
            <span 
              onClick={(e) => handleNav(e, 'privacy')} 
              className="text-slate-300 hover:text-white transition-colors hover:underline underline-offset-4 cursor-pointer"
            >
              Privacy Policy
            </span>
            <span 
              onClick={(e) => handleNav(e, 'terms')} 
              className="text-slate-300 hover:text-white transition-colors hover:underline underline-offset-4 cursor-pointer"
            >
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};