
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './icons/Logo';
import { FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon } from './icons/socialIcons';
import { navLinks } from '../constants';
import ContactForm from './ContactForm';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-dark-gray text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Column 1: Logo, Info, Social */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2" aria-label="Go to SCHOLASTIC A EDU. DEPOT homepage">
              <Logo className="h-10 w-10 text-white" />
              <span className="font-poppins font-bold text-xl">SCHOLASTIC A EDU. DEPOT</span>
            </Link>
            <p className="mt-2 text-secondary text-xs font-semibold tracking-widest uppercase">
              VALUE ADD INNOVATION
            </p>
            <p className="mt-4 text-white/70">
              Training the next generation of IT professionals with skills that matter.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition" aria-label="Follow us on Facebook"><FacebookIcon className="h-6 w-6" /></a>
              <a href="#" className="text-white/70 hover:text-white transition" aria-label="Follow us on Twitter"><TwitterIcon className="h-6 w-6" /></a>
              <a href="#" className="text-white/70 hover:text-white transition" aria-label="Follow us on LinkedIn"><LinkedInIcon className="h-6 w-6" /></a>
              <a href="#" className="text-white/70 hover:text-white transition" aria-label="Follow us on Instagram"><InstagramIcon className="h-6 w-6" /></a>
            </div>
          </div>

          {/* Column 2: Quick Links & Address */}
          <div className="lg:col-span-1">
            <h4 className="font-poppins font-bold text-lg">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map(link => (
                 <li key={link.name}><Link to={link.href} className="text-white/70 hover:text-white transition" aria-label={`Go to ${link.name}`}>{link.name}</Link></li>
              ))}
            </ul>
             <p className="mt-6 text-sm text-white/70"><strong>Address:</strong> D No 37-8-4, OPP 5th town police station, Sathyanagar, Industrial Estate, Visakhapatnam, Andhra Pradesh 530007</p>
          </div>

          {/* Column 3: Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

        </div>
        <div className="mt-12 border-t border-white/20 pt-8 text-center text-white/50">
          <p>&copy; {new Date().getFullYear()} SCHOLASTIC A EDU. DEPOT. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;