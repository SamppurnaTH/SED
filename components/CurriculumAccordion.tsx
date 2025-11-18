
import React, { useState } from 'react';
import { Course } from '../types';

interface CurriculumAccordionProps {
  curriculum: Course['curriculum'];
}

interface AccordionItemProps {
  item: Course['curriculum'][0];
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-5 px-2 gap-4"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-6">
            <span className="text-primary font-bold text-lg w-12 flex-shrink-0">
                Week {item.week}
            </span>
            <h3 className={`font-poppins font-semibold text-lg transition-colors ${isOpen ? 'text-primary' : 'text-dark-gray'}`}>
                {item.title}
            </h3>
        </div>
        <span className="text-primary flex-shrink-0 ml-4">
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
            <ul className="pb-6 pl-14 pr-2 space-y-3">
            {item.topics.map((topic, index) => (
                <li key={index} className="flex items-start text-dark-gray/80">
                    <svg className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    <span>{topic.title}</span>
                </li>
            ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

const CurriculumAccordion: React.FC<CurriculumAccordionProps> = ({ curriculum }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border-t border-gray-200">
      {curriculum.map((item, index) => (
        <AccordionItem
          key={item.week}
          item={item}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default CurriculumAccordion;
