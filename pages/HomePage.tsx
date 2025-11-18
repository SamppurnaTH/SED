
import React from 'react';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import ServiceHighlights from '../components/ServiceHighlights';
import PartnerHighlights from '../components/PartnerHighlights';
import CTA from '../components/CTA';
import MetaTags from '../components/MetaTags';
import BlogHighlights from '../components/BlogHighlights';

const HomePage: React.FC = () => {
  return (
    <>
      <MetaTags
        title="SED Tech Academy | Unlock Your Future in Tech"
        description="Experience a world-class curriculum designed to transform you into a job-ready professional. Real skills, real projects, real placements."
        imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
      />
      <Hero />
      <WhyChooseUs />
      <ServiceHighlights />
      <BlogHighlights />
      <PartnerHighlights />
      <CTA />
    </>
  );
};

export default HomePage;