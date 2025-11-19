

import React, { useState, useEffect, useRef } from 'react';
import CTA from '../components/CTA';
import { teamMembers, coreValues } from '../constants';
import { TeamMember, CoreValue } from '../types';
import { StudentCentricityIcon, InnovationIcon, ExcellenceIcon, IntegrityIcon } from '../components/icons/valueIcons';
import Testimonials from '../components/Testimonials';
import MetaTags from '../components/MetaTags';

const iconMap: { [key: string]: React.FC<{className: string}> } = {
  'StudentCentricityIcon': StudentCentricityIcon,
  'InnovationIcon': InnovationIcon,
  'ExcellenceIcon': ExcellenceIcon,
  'IntegrityIcon': IntegrityIcon,
};

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="text-center">
    <div className="relative w-48 h-48 mx-auto mb-4">
      <img
        src={member.imageUrl}
        alt={`Photo of ${member.name}`}
        className="w-full h-full rounded-full object-cover shadow-lg"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 rounded-full border-4 border-primary/50 transform scale-105"></div>
    </div>
    <h3 className="font-poppins font-bold text-xl text-primary">{member.name}</h3>
    <p className="text-primary">{member.title}</p>
  </div>
);

const ValueCard: React.FC<{ value: CoreValue }> = ({ value }) => {
  const Icon = iconMap[value.icon];
  return (
    <div className="bg-secondary rounded-2xl p-8 text-center transition-all duration-300 transform border border-primary/10 shadow-sm hover:shadow-xl hover:-translate-y-2 h-full">
      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto">
        <Icon className="w-8 h-8 text-secondary" />
      </div>
      <h3 className="font-poppins font-bold text-xl mt-6 text-primary">{value.title}</h3>
      <p className="mt-2 text-primary/80">{value.description}</p>
    </div>
  );
};

const AboutPage: React.FC = () => {
  const [teamVisible, setTeamVisible] = useState(false);
  const [valuesVisible, setValuesVisible] = useState(false);
  const teamRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };

    const teamObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTeamVisible(true);
        teamObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const valuesObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setValuesVisible(true);
        valuesObserver.unobserve(entry.target);
      }
    }, observerOptions);
    
    const currentTeamRef = teamRef.current;
    if (currentTeamRef) teamObserver.observe(currentTeamRef);

    const currentValuesRef = valuesRef.current;
    if (currentValuesRef) valuesObserver.observe(currentValuesRef);

    return () => {
      if (currentTeamRef) teamObserver.disconnect();
      if (currentValuesRef) valuesObserver.disconnect();
    };
  }, []);

  return (
    <>
      <MetaTags
        title="About Us | SED Tech Academy"
        description="We are on a mission to bridge the gap between academic learning and industry demands, empowering the next generation of tech leaders."
      />

      {/* Hero Section */}
      <section className="relative bg-secondary pt-32 pb-20 lg:pt-48 lg:pb-28 text-center overflow-hidden">
        <div className="absolute top-0 right-0 -z-0 transform translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 bg-gradient-to-br from-primary to-secondary rounded-full opacity-10 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 z-10">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
            About <span className="text-accent">SED Tech Academy</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-primary/80 max-w-3xl mx-auto">
            We are on a mission to bridge the gap between academic learning and industry demands, empowering the next generation of tech leaders.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=75&w=1024&auto=format&fit=crop" alt="A mentor guiding a student at a tech academy" className="rounded-2xl shadow-2xl w-full h-auto object-cover" loading="lazy" decoding="async"/>
            </div>
            <div className="text-left">
              <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary">Our Story</h2>
              <p className="mt-6 text-lg text-primary/80">
                Founded by a team of passionate educators and industry professionals, SCHOLASTIC A EDU. DEPOT was born from a shared vision: to create a learning ecosystem that truly prepares students for the challenges of the modern IT landscape.
              </p>
              <p className="mt-4 text-lg text-primary/80">
                We noticed a significant disconnect between traditional education and the practical skills required by top tech companies. Our academy was established to fill that void, offering intensive, project-based training focused on "VALUE ADD INNOVATION." Today, we are proud to have transformed thousands of careers and built a strong network of successful alumni and trusted hiring partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Team Section */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary">
            Meet Our Leadership
          </h2>
          <p className="mt-4 text-lg text-primary/80 max-w-2xl mx-auto">
            Our team consists of experienced professionals dedicated to your success.
          </p>
          <div ref={teamRef} className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className={`transition-all duration-700 ease-out ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Core Values Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-6">
            <div className="text-center">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary">
                Our Core Values
            </h2>
            <p className="mt-4 text-lg text-primary/80 max-w-2xl mx-auto">
                The principles that guide our commitment to education and student success.
            </p>
            </div>
            <div ref={valuesRef} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
                <div 
                  key={value.title}
                  className={`transition-all duration-700 ease-out ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ValueCard value={value} />
                </div>
            ))}
            </div>
        </div>
      </section>

      <Testimonials />

      <CTA />
    </>
  );
};

export default AboutPage;