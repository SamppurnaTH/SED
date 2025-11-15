import React, { useState, useEffect, useRef } from 'react';
import { testimonials } from '../constants';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        ),
      5000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-light-gray">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-dark-gray">
          What Our Students Say
        </h2>
        <div className="relative mt-12 max-w-3xl mx-auto h-96 md:h-80 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 h-full px-4"
                aria-hidden={index !== currentIndex}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full object-cover shadow-lg mb-6 border-4 border-white"
                    loading="lazy"
                    decoding="async"
                  />
                  <blockquote className="text-xl md:text-2xl font-light text-dark-gray/90 italic max-w-2xl">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="mt-6 font-poppins font-bold text-lg text-dark-gray">
                    {testimonial.name}
                  </p>
                  <p className="text-primary font-medium">
                    {testimonial.course} Graduate
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentIndex === index ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;