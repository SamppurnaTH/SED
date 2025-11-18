
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Partner } from '../types';
import { partners as staticPartners, API_URL } from '../constants';

interface PartnersContextType {
  partners: Partner[];
  getPartnerBySlug: (slug: string) => Partner | undefined;
  addPartner: (partner: Partner) => Promise<void>;
  updatePartner: (slug: string, updatedPartner: Partner) => Promise<void>;
  deletePartner: (slug: string) => Promise<void>;
}

const PartnersContext = createContext<PartnersContextType | undefined>(undefined);

export const PartnersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
        try {
            const response = await fetch(`${API_URL}/partners`);
            if (!response.ok) throw new Error('Failed to fetch partners');
            const data = await response.json();
            setPartners(data);
        } catch (error) {
            console.info("Using static partner data (Backend offline).");
            setPartners(staticPartners);
        }
    };
    fetchPartners();
  }, []);

  const getPartnerBySlug = (slug: string) => {
    return partners.find(p => p.slug === slug);
  };

  const addPartner = async (partner: Partner) => {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/partners`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(partner),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setPartners(prev => [...prev, data]);
    } catch (error: any) {
        alert(`Error adding partner: ${error.message}`);
        throw error;
    }
  };

  const updatePartner = async (slug: string, updatedPartner: Partner) => {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/partners/${slug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(updatedPartner),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setPartners(prev => prev.map(p => (p.slug === slug ? data : p)));
    } catch (error: any) {
        alert(`Error updating partner: ${error.message}`);
        throw error;
    }
  };

  const deletePartner = async (slug: string) => {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/partners/${slug}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        setPartners(prev => prev.filter(p => p.slug !== slug));
    } catch (error: any) {
        alert(`Error deleting partner: ${error.message}`);
        throw error;
    }
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
