import React from 'react';
import { Partner } from '../types';
import { Link } from 'react-router-dom';

const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => {
  return (
    <Link
      to={`/partners/${partner.slug}`}
      className="group block bg-white rounded-2xl p-6 transition-all duration-300 transform border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1"
    >
      <div className="flex items-center space-x-6">
        <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-light-gray rounded-full p-2">
          <img
            src={partner.logoUrl}
            alt={`${partner.name} logo`}
            className="max-h-12 w-auto object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div>
          <h3 className="font-poppins font-bold text-xl text-dark-gray group-hover:text-primary transition-colors">{partner.name}</h3>
          <p className="mt-1 text-dark-gray/80 text-sm">{partner.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default PartnerCard;
