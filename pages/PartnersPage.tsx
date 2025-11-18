
import React, { useState } from 'react';
import CTA from '../components/CTA';
import PartnerCard from '../components/PartnerCard';
import { usePartners } from '../contexts/PartnersContext';
import MetaTags from '../components/MetaTags';

const PartnersPage: React.FC = () => {
    const { partners } = usePartners();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPartners = partners.filter(partner =>
        partner.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <MetaTags
              title="Our Hiring Partners | SED Tech Academy"
              description="We collaborate with leading companies in the tech industry to create unparalleled placement opportunities for our students."
            />
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-light-gray to-white pt-32 pb-20 lg:pt-48 lg:pb-28 text-center overflow-hidden">
                <div className="absolute top-0 left-0 -z-0 transform -translate-x-1/2 -translatey-1/2">
                    <div className="w-96 h-96 bg-gradient-to-br from-primary to-secondary rounded-full opacity-10 blur-3xl"></div>
                </div>
                <div className="container mx-auto px-6 z-10">
                    <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-dark-gray leading-tight">
                        Our Hiring Partners
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-dark-gray/80 max-w-3xl mx-auto">
                        We collaborate with leading companies in the tech industry to create unparalleled placement opportunities for our students.
                    </p>
                </div>
            </section>

            {/* Partners Grid Section */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container mx-auto px-6">
                    {/* Search Bar */}
                    <div className="mb-12 max-w-2xl mx-auto">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search for a partner..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-full shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                                aria-label="Search partners"
                            />
                        </div>
                    </div>

                    {/* Grid */}
                    {filteredPartners.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {filteredPartners.map(partner => (
                                <PartnerCard key={partner.slug} partner={partner} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 px-6 bg-light-gray rounded-2xl">
                            <h3 className="font-poppins font-bold text-2xl text-dark-gray">
                                No Partners Found
                            </h3>
                            <p className="mt-2 text-dark-gray/80">
                                {searchTerm 
                                 ? `Your search for "${searchTerm}" did not match any of our partners.`
                                 : "No hiring partners are listed at the moment. Please check back later."
                                }
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <CTA />
        </>
    );
};

export default PartnersPage;