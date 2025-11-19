import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './icons/Logo';
import { FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon } from './icons/socialIcons';
import { navLinks } from '../constants';
import ContactForm from './ContactForm';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-primary text-secondary">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Logo, Info, Social */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 text-secondary" aria-label="Go to SCHOLASTIC A EDU. DEPOT homepage">
              <Logo className="h-12 w-auto" />
              <span className="font-poppins font-bold text-xl leading-tight">SCHOLASTIC A<br/>EDU. DEPOT</span>
            </Link>
            <p className="mt-2 text-secondary/80 text-xs font-semibold tracking-widest uppercase">
              VALUE ADD INNOVATION
            </p>
            <p className="mt-4 text-sm text-secondary/70">
              Training the next generation of IT professionals with skills that matter.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-secondary/70 hover:text-secondary transition" aria-label="Follow us on Facebook"><FacebookIcon className="h-6 w-6" /></a>
              <a href="#" className="text-secondary/70 hover:text-secondary transition" aria-label="Follow us on Twitter"><TwitterIcon className="h-6 w-6" /></a>
              <a href="#" className="text-secondary/70 hover:text-secondary transition" aria-label="Follow us on LinkedIn"><LinkedInIcon className="h-6 w-6" /></a>
              <a href="#" className="text-secondary/70 hover:text-secondary transition" aria-label="Follow us on Instagram"><InstagramIcon className="h-6 w-6" /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="font-poppins font-bold text-lg">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map(link => (
                 <li key={link.name}><Link to={link.href} className="text-secondary/70 hover:text-secondary transition" aria-label={`Go to ${link.name}`}>{link.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Form */}
          <div className="md:col-span-2 lg:col-span-2">
            <ContactForm />
          </div>

        </div>
        <div className="mt-16 border-t border-secondary/20 pt-8 text-center text-secondary/50">
          <div className="flex justify-center gap-x-6 gap-y-2 flex-wrap mb-4">
             <Link to="/privacy-policy" className="text-sm hover:text-secondary transition">Privacy Policy</Link>
             <Link to="/terms-and-conditions" className="text-sm hover:text-secondary transition">Terms & Conditions</Link>
             <Link to="/cookie-policy" className="text-sm hover:text-secondary transition">Cookie Policy</Link>
             <Link to="/refund-policy" className="text-sm hover:text-secondary transition">Refund Policy</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} SCHOLASTIC A EDU. DEPOT. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;