import React from 'react';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import ServiceHighlights from '../components/ServiceHighlights';
import PartnerHighlights from '../components/PartnerHighlights';
import CTA from '../components/CTA';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ServiceHighlights />
      <PartnerHighlights />
      <CTA />
    </>
  );
};

export default HomePage;
