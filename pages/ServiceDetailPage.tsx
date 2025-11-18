
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useServices } from '../contexts/ServicesContext';
import CTA from '../components/CTA';
import { CheckCircleIcon } from '../components/icons/detailIcons';
import MetaTags from '../components/MetaTags';

const ServiceDetailPage: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const { getServiceBySlug } = useServices();
  const service = getServiceBySlug(serviceSlug || '');

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <>
      <MetaTags
        title={`${service.title} | SED Tech Academy Services`}
        description={service.tagline}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 pt-32 pb-20 lg:pt-48 lg:pb-28 text-center overflow-hidden">
         <div className="absolute top-0 right-0 -z-0 transform translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 bg-gradient-to-br from-accent to-secondary rounded-full opacity-10 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 z-10">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-dark-gray leading-tight mt-2">
            {service.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-dark-gray/80 max-w-3xl mx-auto">
            {service.tagline}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="font-poppins font-bold text-3xl text-dark-gray">Service Overview</h2>
              <p className="mt-4 text-lg text-dark-gray/80 leading-relaxed">
                {service.description}
              </p>

              <h3 className="font-poppins font-bold text-2xl text-dark-gray mt-12">Key Features</h3>
              <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-dark-gray/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                  <h3 className="font-poppins font-semibold text-xl text-dark-gray">Interested in this service?</h3>
                  <p className="mt-2 text-dark-gray/80">Contact us to learn how we can help you achieve your goals.</p>
                  <Link to="/#contact" className="inline-block mt-6 bg-primary text-white font-poppins font-bold py-3 px-8 rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 transform">
                    Get in Touch
                  </Link>
              </div>
            </div>
        </div>
      </section>

      <CTA />
    </>
  );
};

export default ServiceDetailPage;