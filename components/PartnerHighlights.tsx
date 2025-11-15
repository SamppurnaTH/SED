import React from 'react';
import { partners } from '../constants';

const PartnerHighlights: React.FC = () => {
  const allPartners = [...partners, ...partners]; // Duplicate for seamless loop

  return (
    <section id="partners" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-dark-gray">
          Our Hiring Partners
        </h2>
        <div className="relative mt-12 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div className="flex animate-logo-carousel">
            {allPartners.map((partner, index) => (
              <a
                key={index}
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${partner.name} website`}
                className="flex-shrink-0 w-48 h-24 mx-8 flex items-center justify-center"
              >
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="max-h-14 w-auto object-contain filter grayscale hover:filter-none hover:scale-110 transform transition-all duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerHighlights;