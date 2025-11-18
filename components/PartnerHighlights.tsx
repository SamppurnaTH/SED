
import React from 'react';
import { usePartners } from '../contexts/PartnersContext';

const PartnerHighlights: React.FC = () => {
  const { partners } = usePartners();
  
  // Handle empty partners list gracefully
  if (partners.length === 0) {
    return (
        <section id="partners" className="py-20 lg:py-28 bg-secondary">
            <div className="container mx-auto px-6 text-center">
                 <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary">
                    Our Hiring Partners
                </h2>
                <p className="mt-4 text-primary/70">Partners will be listed here soon.</p>
            </div>
        </section>
    );
  }

  const allPartners = [...partners, ...partners]; // Duplicate for seamless loop

  return (
    <section id="partners" className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary">
          Our Hiring Partners
        </h2>
        <div className="relative mt-12 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div className="flex animate-logo-carousel">
            {allPartners.map((partner, index) => (
              <a
                key={`${partner.slug}-${index}`}
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
