
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTA from '../components/CTA';
import { useServices } from '../contexts/ServicesContext';
import { Service } from '../types';
import {
  CorporateTrainingIcon,
  CampusRecruitmentIcon,
  CurriculumDevIcon,
  MentorshipIcon,
  WorkshopIcon,
  ProjectIncubationIcon,
} from '../components/icons/serviceIcons';

const iconMap: { [key: string]: React.FC<{className: string}> } = {
  'Corporate Training': CorporateTrainingIcon,
  'Campus Recruitment Training': CampusRecruitmentIcon,
  'Custom Curriculum Development': CurriculumDevIcon,
  'Career Counseling & Mentorship': MentorshipIcon,
  'Workshops & Webinars': WorkshopIcon,
  'Project Incubation': ProjectIncubationIcon,
};

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const Icon = iconMap[service.title] || CorporateTrainingIcon;
  return (
    <div className="bg-white rounded-2xl p-8 transition-all duration-300 transform border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 flex flex-col">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="font-poppins font-bold text-xl mt-6 text-dark-gray">{service.title}</h3>
      <p className="mt-2 text-dark-gray/80 flex-grow">{service.description}</p>
      <ul className="mt-4 space-y-2 text-dark-gray/80">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>{feature}</span>
            </li>
          ))}
      </ul>
       <Link 
          to={`/services/${service.slug}`} 
          className="group mt-6 inline-flex items-center font-poppins font-bold text-primary self-start hover:text-accent transition-colors duration-300"
          aria-label={`Learn more about ${service.title}`}
        >
          <span className="group-hover:underline">Learn More</span>
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </Link>
    </div>
  );
};


const ServicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { services } = useServices();

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-light-gray to-white pt-32 pb-20 lg:pt-48 lg:pb-28 text-center overflow-hidden">
        <div className="absolute top-0 right-0 -z-0 transform translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 bg-gradient-to-br from-accent to-secondary rounded-full opacity-10 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 z-10">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-dark-gray leading-tight">
            Our Services
          </h1>
          <p className="mt-6 text-lg md:text-xl text-dark-gray/80 max-w-3xl mx-auto">
            Comprehensive solutions designed to empower individuals and organizations in the tech landscape.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-light-gray">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-dark-gray">
              What We Offer
            </h2>
             <p className="mt-4 text-lg text-dark-gray/80 max-w-3xl mx-auto">
                From corporate upskilling to individual career guidance, our services are tailored to meet the dynamic needs of the technology sector.
            </p>
          </div>
           {/* Search Bar */}
          <div className="mt-12 max-w-2xl mx-auto">
              <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                  </span>
                  <input
                      type="text"
                      placeholder="Search services by title or tagline..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-full shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                      aria-label="Search services"
                  />
              </div>
          </div>
          <div className="mt-16">
            {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service) => (
                    <ServiceCard key={service.title} service={service} />
                ))}
                </div>
            ) : (
                <div className="text-center py-16 px-6 bg-white rounded-2xl border border-gray-200">
                    <h3 className="font-poppins font-bold text-2xl text-dark-gray">
                        No Services Found
                    </h3>
                    <p className="mt-2 text-dark-gray/80">
                        Your search for "{searchTerm}" did not match any of our services.
                    </p>
                </div>
            )}
           </div>
        </div>
      </section>

      <CTA />
    </>
  );
};

export default ServicesPage;