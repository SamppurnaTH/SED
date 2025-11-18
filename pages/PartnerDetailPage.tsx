
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import CTA from '../components/CTA';
import { CheckCircleIcon } from '../components/icons/detailIcons';
import { usePartners } from '../contexts/PartnersContext';
import MetaTags from '../components/MetaTags';

const PartnerDetailPage: React.FC = () => {
  const { partnerSlug } = useParams<{ partnerSlug: string }>();
  const { partners } = usePartners();
  const partner = partners.find(p => p.slug === partnerSlug);

  if (!partner) {
    return <Navigate to="/partners" replace />;
  }

  return (
    <>
      <MetaTags
        title={`Partner: ${partner.name} | SED Tech Academy`}
        description={partner.description}
        imageUrl={partner.bannerImageUrl}
      />
      {/* Banner Section */}
      <section 
        className="relative pt-48 pb-32 bg-cover bg-center" 
        style={{ backgroundImage: `url(${partner.bannerImageUrl})` }}
      >
        <div className="absolute inset-0 bg-dark-gray/60"></div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <div className="inline-block bg-white/90 p-4 rounded-full shadow-lg mb-6">
            <img src={partner.logoUrl} alt={`${partner.name} Logo`} className="h-20 w-auto object-contain" loading="lazy" decoding="async" />
          </div>
          <h1 className="font-poppins font-bold text-5xl md:text-6xl">{partner.name}</h1>
          <p className="mt-4 text-lg text-white/90">{partner.description}</p>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="py-20 lg:py-28 bg-light-gray">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Left Column: Overview & Gallery */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="font-poppins font-bold text-3xl text-dark-gray">About Our Partnership with {partner.name}</h2>
                <p className="mt-4 text-lg text-dark-gray/80 leading-relaxed whitespace-pre-line">
                  {partner.longDescription}
                </p>
              </div>

              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 mt-12">
                <h2 className="font-poppins font-bold text-3xl text-dark-gray">Gallery</h2>
                <div className="mt-6 text-center text-dark-gray/60 bg-gray-100 p-10 rounded-lg">
                  <p className="font-semibold">Coming Soon</p>
                  <p className="text-sm">We're currently curating a gallery of our successful placements and events with {partner.name}.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hiring Roles & Contact */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-28">
                <h3 className="font-poppins font-bold text-2xl text-dark-gray">We Hire For</h3>
                <ul className="mt-6 space-y-4">
                  {partner.hiringRoles.map((role, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                      <span className="text-lg text-dark-gray/90">{role}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-8 bg-primary text-white font-poppins font-bold py-4 px-8 text-center rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300 transform"
                >
                  Visit Careers Page
                </a>
              </div>
              <div className="bg-dark-gray text-white p-8 rounded-2xl mt-8 shadow-lg">
                <h3 className="font-poppins font-bold text-2xl">Contact for Opportunities</h3>
                <div className="mt-4 space-y-2 text-white/80">
                  <p><strong>Email:</strong> <a href={`mailto:${partner.contact.email}`} className="hover:text-secondary transition-colors">{partner.contact.email}</a></p>
                  <p><strong>Phone:</strong> <a href={`tel:${partner.contact.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-secondary transition-colors">{partner.contact.phone}</a></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <CTA />
    </>
  );
};

export default PartnerDetailPage;