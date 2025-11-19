

import React, { useState, useEffect, useRef } from 'react';
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
    <div className="bg-secondary rounded-2xl p-8 text-center transition-all duration-300 transform border border-primary/10 shadow-sm hover:shadow-xl hover:-translate-y-2 h-full">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <Icon className="w-8 h-8 text-secondary" />
        </div>
      </div>
      <h3 className="font-poppins font-bold text-xl mt-6 text-primary">{feature.title}</h3>
      <p className="mt-2 text-primary/80">{feature.description}</p>
    </div>
  );
};


const WhyChooseUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="why-sed" className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary">
            Why Choose <span className="text-accent">SED Tech Academy</span>?
          </h2>
           <p className="mt-4 text-lg text-primary/80 max-w-3xl mx-auto">
            We are committed to providing a transformative learning experience that equips you with the skills, confidence, and connections to succeed in the tech industry.
          </p>
        </div>
        <div ref={sectionRef} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <FeatureCard feature={feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;