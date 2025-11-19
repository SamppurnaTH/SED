

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedCounter from './AnimatedCounter';
import ParticleCanvas from './ParticleCanvas';

const Hero: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [startCounters, setStartCounters] = useState(false);
  
  const [backgroundImage, setBackgroundImage] = useState<string | null>('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=75&w=1920&auto=format&fit=crop');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setStartCounters(true);
          observer.unobserve(entry.target); // Animate only once
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const hasImage = !!backgroundImage;
  
  // With image, text is always white. Without image, it uses light theme text.
  const heroTextColor = hasImage ? 'text-secondary' : 'text-text-primary';
  const statsTextColor = hasImage ? 'text-secondary/80' : 'text-text-muted';
  
  // Primary button (Explore Courses) is `bg-accent text-white`, which is fine everywhere.
  
  // Secondary button (View All Programs) needs to adapt
  const secondaryButtonClasses = hasImage 
    ? 'border-secondary text-secondary hover:bg-secondary hover:text-primary'
    : 'border-primary text-primary hover:bg-primary hover:text-secondary';
  

  return (
    <section 
      id="home" 
      className={`relative pt-32 pb-20 lg:pt-48 lg:pb-28 overflow-hidden ${hasImage ? 'bg-cover bg-center' : 'bg-secondary'}`}
      style={hasImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
      aria-live="polite"
    >
      {hasImage && <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/60 to-accent/20 backdrop-blur-sm z-0" aria-hidden="true"></div>}
      {!hasImage && <ParticleCanvas />}
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <h1 className={`font-poppins font-bold text-4xl md:text-5xl lg:text-6xl ${heroTextColor} leading-tight max-w-4xl`}>
              Unlock Your Future in Tech. Premium Training for Ambitious Minds.
            </h1>
            <p className={`mt-6 text-lg md:text-xl ${statsTextColor} max-w-2xl mx-auto`}>
              Experience a world-class curriculum designed to transform you into a job-ready professional. Real skills, real projects, real placements.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
              <Link to="/#courses" className={`bg-accent text-white font-poppins font-bold py-4 px-8 rounded-lg hover:opacity-90 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 transform`} aria-label="Enroll in a course now">
                Explore Courses
              </Link>
              <Link to="/programs" className={`bg-transparent border-2 ${secondaryButtonClasses} font-poppins font-bold py-4 px-8 rounded-lg hover:scale-105 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 transform`} aria-label="View our programs">
                View All Programs
              </Link>
            </div>
          </div>
        </div>
        <div ref={statsRef} className={`mt-20 lg:mt-28 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center ${heroTextColor}`}>
          <div>
            <AnimatedCounter end={5000} startAnimation={startCounters} suffix="+" />
            <p className={`mt-2 ${statsTextColor}`}>Students Trained</p>
          </div>
          <div>
            <AnimatedCounter end={300} startAnimation={startCounters} suffix="+" />
            <p className={`mt-2 ${statsTextColor}`}>Hiring Partners</p>
          </div>
          <div>
            <AnimatedCounter end={90} startAnimation={startCounters} suffix="%" />
            <p className={`mt-2 ${statsTextColor}`}>Placement Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;