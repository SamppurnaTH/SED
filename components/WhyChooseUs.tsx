import React from 'react';
import { features } from '../constants';
import { Feature } from '../types';
import { ExpertIcon, ProjectIcon, PlacementIcon, FlexibleIcon } from './icons/featureIcons';

const iconMap: { [key: string]: React.FC<{className: string}> } = {
  'ExpertIcon': ExpertIcon,
  'ProjectIcon': ProjectIcon,
  'PlacementIcon': PlacementIcon,
  'FlexibleIcon': FlexibleIcon,
};

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  const Icon = iconMap[feature.icon];
  return (
    <div className="bg-white rounded-2xl p-8 text-center transition-all duration-300 transform border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/10 to-secondary/10 flex items-center justify-center mx-auto">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
            <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <h3 className="font-poppins font-bold text-xl mt-6 text-dark-gray">{feature.title}</h3>
      <p className="mt-2 text-dark-gray/80">{feature.description}</p>
    </div>
  );
};


const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-sed" className="py-20 lg:py-28 bg-light-gray">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-dark-gray">
            Why Choose <span className="text-primary">SED Tech Academy</span>?
          </h2>
           <p className="mt-4 text-lg text-dark-gray/80 max-w-3xl mx-auto">
            We are committed to providing a transformative learning experience that equips you with the skills, confidence, and connections to succeed in the tech industry.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;