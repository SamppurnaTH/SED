
import React from 'react';

// Define PARTNERS constant directly in the file
const PARTNERS = [
  {
    name: 'Google',
    logo: '/images/partners/google.svg'
  },
  {
    name: 'Microsoft',
    logo: '/images/partners/microsoft.svg'
  },
  {
    name: 'Amazon',
    logo: '/images/partners/amazon.svg'
  },
  {
    name: 'Facebook',
    logo: '/images/partners/facebook.svg'
  },
  {
    name: 'Apple',
    logo: '/images/partners/apple.svg'
  },
  {
    name: 'Netflix',
    logo: '/images/partners/netflix.svg'
  },
  {
    name: 'Uber',
    logo: '/images/partners/uber.svg'
  },
  {
    name: 'Airbnb',
    logo: '/images/partners/airbnb.svg'
  }
];

export const Partners: React.FC = () => {
  // Duplicate the list for infinite scroll effect
  const doubledPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-16 bg-white border-y border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h3 className="text-xl font-display font-bold text-slate-900 mb-3">
           Trusted by Hiring Partners from Top Companies
        </h3>
        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
            Our graduates are making an impact at leading technology organizations worldwide, securing positions at Fortune 500 companies and high-growth startups.
        </p>
      </div>
      
      {/* Scroll Container */}
      <div className="relative w-full group">
        
        {/* Gradient Masks for smooth fade effect */}
        <div className="absolute top-0 left-0 h-full w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Content */}
        <div className="flex animate-scroll whitespace-nowrap py-6 items-center group-hover:[animation-play-state:paused]">
          {doubledPartners.map((partner, index) => (
            <div 
              key={`${partner.name}-${index}`} 
              className="mx-8 lg:mx-12 flex-shrink-0 relative group/logo"
            >
              <div className="opacity-50 group-hover/logo:opacity-100 transition-all duration-500 filter grayscale group-hover/logo:grayscale-0 cursor-pointer transform group-hover/logo:scale-110">
                 <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-10 md:h-12 w-auto object-contain"
                    loading="lazy"
                 />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
