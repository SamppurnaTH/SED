
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedCounter from './AnimatedCounter';
import ParticleCanvas from './ParticleCanvas';

const Hero: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [startCounters, setStartCounters] = useState(false);

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
        threshold: 0.1, // Trigger when 10% of the element is visible
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

  return (
    <section id="home" className="relative pt-40 pb-32 lg:pt-56 lg:pb-40 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')" }}>
      <div className="absolute inset-0 bg-dark-gray/70"></div>
      <ParticleCanvas />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight text-shadow-md max-w-4xl">
              Real skills. Real projects. Real placements. No shortcuts.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto text-shadow-sm">
              Training built around industry expectations — not outdated syllabi.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/#courses" className="bg-primary text-white font-poppins font-bold py-4 px-8 rounded-lg hover:scale-105 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform" aria-label="Enroll in a course now">
                Enroll Now
              </Link>
              <Link to="/programs" className="bg-transparent border-2 border-white text-white font-poppins font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-primary hover:scale-105 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform" aria-label="View our programs">
                View Programs
              </Link>
            </div>
          </div>
        </div>
        <div ref={statsRef} className="mt-20 lg:mt-28 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-white">
          <div>
            <AnimatedCounter end={5000} startAnimation={startCounters} suffix="+" />
            <p className="mt-2 text-white/80">Students Trained</p>
          </div>
          <div>
            <AnimatedCounter end={300} startAnimation={startCounters} suffix="+" />
            <p className="mt-2 text-white/80">Hiring Partners</p>
          </div>
          <div>
            <AnimatedCounter end={90} startAnimation={startCounters} suffix="%" />
            <p className="mt-2 text-white/80">Placement Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;