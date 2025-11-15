
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navLinks } from '../constants';
import Logo from './icons/Logo';
import { useAuth } from '../contexts/AuthContext';
import { UserIcon } from './icons/UserIcon';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    closeMenu();
    logout();
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2" aria-label="Go to SCHOLASTIC A EDU. DEPOT homepage">
          <Logo className="h-10 w-10" />
           <span className="font-poppins font-bold text-2xl text-dark-gray">SED</span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} className="font-poppins font-medium text-dark-gray hover:text-primary transition-colors" aria-label={`Go to ${link.name} section`}>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 font-poppins font-medium text-dark-gray hover:text-primary transition-colors">
                    <UserIcon className="w-6 h-6"/>
                    <span>{user?.name}</span>
                </Link>
                <button onClick={handleLogout} className="bg-primary text-white font-poppins font-bold py-2 px-6 rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300" aria-label="Logout">
                    Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="font-poppins font-medium text-dark-gray hover:text-primary transition-colors" aria-label="Login to your account">
                    Login
                </Link>
                <Link to="/register" className="bg-primary text-white font-poppins font-bold py-2 px-6 rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300" aria-label="Create an account">
                    Sign Up
                </Link>
              </>
            )}
        </div>


        <button
          className="lg:hidden text-dark-gray"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      <div
        className={`absolute top-full left-0 right-0 lg:hidden bg-white shadow-lg transition-transform duration-300 ease-in-out transform origin-top ${
          isMenuOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
      >
        <nav className="flex flex-col items-center space-y-4 py-4">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} onClick={closeMenu} className="font-poppins font-medium text-dark-gray hover:text-primary transition-colors" aria-label={`Go to ${link.name} section`}>
              {link.name}
            </Link>
          ))}
           <div className="w-full px-4 pt-4 border-t border-gray-200 mt-2">
            {isAuthenticated ? (
                <>
                    <Link to="/dashboard" onClick={closeMenu} className="w-full flex items-center justify-center gap-2 font-poppins font-medium text-dark-gray hover:text-primary transition-colors mb-4">
                        <UserIcon className="w-6 h-6"/>
                        <span>{user?.name}</span>
                    </Link>
                    <button onClick={handleLogout} className="w-full bg-primary text-white font-poppins font-bold py-3 px-8 rounded-lg text-center hover:scale-105 hover:shadow-lg transition-all duration-300" aria-label="Logout">
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link to="/login" onClick={closeMenu} className="block w-full text-center font-poppins font-medium text-dark-gray hover:text-primary transition-colors mb-4" aria-label="Login to your account">
                        Login
                    </Link>
                    <Link to="/register" onClick={closeMenu} className="w-full block bg-primary text-white font-poppins font-bold py-3 px-8 rounded-lg text-center hover:scale-105 hover:shadow-lg transition-all duration-300" aria-label="Create an account">
                        Sign Up
                    </Link>
                </>
            )}
           </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
