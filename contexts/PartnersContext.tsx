
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Partner } from '../types';
import { partners as initialPartners } from '../constants';

interface PartnersContextType {
  partners: Partner[];
  getPartnerBySlug: (slug: string) => Partner | undefined;
  addPartner: (partner: Partner) => void;
  updatePartner: (slug: string, updatedPartner: Partner) => void;
  deletePartner: (slug: string) => void;
}

const PartnersContext = createContext<PartnersContextType | undefined>(undefined);

export const PartnersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);

  const getPartnerBySlug = (slug: string) => {
    return partners.find(p => p.slug === slug);
  };

  const addPartner = (partner: Partner) => {
    // Basic validation to prevent duplicate slugs
    if (partners.some(p => p.slug === partner.slug)) {
        alert('Error: A partner with this slug already exists.');
        return;
    }
    setPartners(prev => [...prev, partner]);
  };

  const updatePartner = (slug: string, updatedPartner: Partner) => {
    setPartners(prev => prev.map(p => (p.slug === slug ? updatedPartner : p)));
  };

  const deletePartner = (slug: string) => {
    setPartners(prev => prev.filter(p => p.slug !== slug));
  };


  return (
    <PartnersContext.Provider value={{ partners, getPartnerBySlug, addPartner, updatePartner, deletePartner }}>
      {children}
    </PartnersContext.Provider>
  );
};

export const usePartners = () => {
  const context = useContext(PartnersContext);
  if (context === undefined) {
    throw new Error('usePartners must be used within a PartnersProvider');
  }
  return context;
};
