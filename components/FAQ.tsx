

import React, { useState } from 'react';
import { faqs } from '../constants';

interface FaqItemProps {
  faq: {
    question: string;
    answer: string;
  };
  isOpen: boolean;
  onClick: () => void;
  id: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ faq, isOpen, onClick, id }) => {
  const panelId = `faq-panel-${id}`;
  const buttonId = `faq-button-${id}`;

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        id={buttonId}
        onClick={onClick}
        className="w-full flex justify-between items-center text-left gap-4"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <h3 className={`font-poppins font-semibold text-lg transition-colors ${isOpen ? 'text-primary' : 'text-dark-gray'}`}>
          {faq.question}
        </h3>
        <span className="text-primary flex-shrink-0">
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pt-4 text-dark-gray/80 leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-dark-gray">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-dark-gray/80 max-w-2xl mx-auto">
            Have questions? We have answers. If you can't find what you're looking for, please feel free to contact us.
          </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              id={`faq-${index}`}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;