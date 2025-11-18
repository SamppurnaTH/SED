
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { navLinks } from '../constants';
import Logo from './icons/Logo';
import { useAuth } from '../contexts/AuthContext';
// FIX: Updated the import for UserIcon to point to the consolidated AuthIcons.tsx.
import { UserIcon } from './icons/AuthIcons';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  // --- DYNAMIC COLOR LOGIC ---
  const onHomePage = location.pathname === '/';
  
  const isHeaderBgDark = isScrolled || isMenuOpen;
  
  // The transparent header on the homepage sits on a dark hero image.
  const isEffectivelyDark = isHeaderBgDark || (!isHeaderBgDark && onHomePage);

  // Determine text and button colors based on the effective background
  const textColorClass = isEffectivelyDark ? 'text-secondary' : 'text-text-primary';
  const buttonTextColorClass = isEffectivelyDark ? 'text-primary' : 'text-secondary';
  const loginLinkColorClass = isEffectivelyDark ? 'text-secondary' : 'text-text-primary';


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-primary/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2" aria-label="Go to SCHOLASTIC A EDU. DEPOT homepage">
          <Logo className="h-12 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} className={`font-poppins font-medium hover:opacity-75 transition-opacity ${textColorClass}`} aria-label={`Go to ${link.name} section`}>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={`flex items-center gap-2 font-poppins font-medium hover:opacity-75 transition-opacity ${textColorClass}`}>
                    {user?.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-white/30" />
                    ) : (
                        <UserIcon className="w-6 h-6"/>
                    )}
                    <span>{user?.name}</span>
                </Link>
                <button onClick={handleLogout} className={`font-poppins font-bold py-2 px-6 rounded-lg hover:scale-105 active:scale-95 hover:shadow-lg transition-all duration-300 bg-secondary text-primary`} aria-label="Logout">
                    Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`font-poppins font-medium hover:opacity-75 transition-opacity ${loginLinkColorClass}`} aria-label="Login to your account">
                    Login
                </Link>
                <Link to="/register" className={`font-poppins font-bold py-2 px-6 rounded-lg hover:scale-105 active:scale-95 hover:shadow-lg transition-all duration-300 bg-accent text-white`} aria-label="Create an account">
                    Sign Up
                </Link>
              </>
            )}
        </div>


        <button
          className={`lg:hidden ${textColorClass}`}
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
        className={`absolute top-full left-0 right-0 lg:hidden bg-primary shadow-lg transition-transform duration-300 ease-in-out transform origin-top ${
          isMenuOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
      >
        <nav className="flex flex-col items-center space-y-4 py-4">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} onClick={closeMenu} className="font-poppins font-medium text-secondary hover:opacity-75 transition-opacity" aria-label={`Go to ${link.name} section`}>
              {link.name}
            </Link>
          ))}
           <div className="w-full px-4 pt-4 border-t border-secondary/20 mt-2">
            {isAuthenticated ? (
                <>
                    <Link to="/dashboard" onClick={closeMenu} className="w-full flex items-center justify-center gap-2 font-poppins font-medium text-secondary hover:opacity-75 transition-colors mb-4">
                        {user?.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-white/30" />
                        ) : (
                            <UserIcon className="w-6 h-6"/>
                        )}
                        <span>{user?.name}</span>
                    </Link>
                    <button onClick={handleLogout} className="w-full bg-secondary text-primary font-poppins font-bold py-3 px-8 rounded-lg text-center hover:scale-105 active:scale-95 hover:shadow-lg transition-all duration-300" aria-label="Logout">
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link to="/login" onClick={closeMenu} className="block w-full text-center font-poppins font-medium text-secondary hover:opacity-75 transition-colors mb-4" aria-label="Login to your account">
                        Login
                    </Link>
                    <Link to="/register" onClick={closeMenu} className="w-full block bg-accent text-white font-poppins font-bold py-3 px-8 rounded-lg text-center hover:scale-105 active:scale-95 hover:shadow-lg transition-all duration-300" aria-label="Create an account">
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
