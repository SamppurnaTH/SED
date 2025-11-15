
import React from 'react';
import { Link } from 'react-router-dom';

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] animate-gradient-sweep">
      <div className="container mx-auto px-6 text-center text-white">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl">
          Ready to Start Your Tech Career?
        </h2>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Join thousands of students who transformed their careers through SCHOLASTIC A EDU. DEPOT.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/#contact" className="bg-white text-primary font-poppins font-bold py-4 px-8 rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300 transform" aria-label="Speak to an academy counsellor">
            Speak to a Counsellor
          </Link>
          <Link to="/programs" className="bg-transparent border-2 border-white text-white font-poppins font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-primary hover:scale-105 hover:shadow-xl transition-all duration-300 transform" aria-label="Apply to SCHOLASTIC A EDU. DEPOT now">
            Apply Now
          </Link>
        </div>
        <div className="mt-8">
          <Link to="/about" className="text-white/90 font-poppins font-medium hover:text-white hover:underline transition-colors" aria-label="Learn more about us">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
