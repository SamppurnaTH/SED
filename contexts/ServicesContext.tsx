
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Service } from '../types';
import { services as staticServices, API_URL } from '../constants';

interface ServicesContextType {
  services: Service[];
  getServiceBySlug: (slug: string) => Service | undefined;
  addService: (service: Service) => Promise<void>;
  updateService: (slug: string, updatedService: Service) => Promise<void>;
  deleteService: (slug: string) => Promise<void>;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const ServicesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/services`);
        if (!response.ok) throw new Error('Failed to fetch services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.info("Using static service data (Backend offline).");
        setServices(staticServices);
      }
    };
    fetchServices();
  }, []);


  const getServiceBySlug = (slug: string) => {
    return services.find(s => s.slug === slug);
  };

  const addService = async (service: Service) => {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/services`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(service),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setServices(prev => [...prev, data]);
    } catch (error: any) {
        alert(`Error adding service: ${error.message}`);
        throw error;
    }
  };

  const updateService = async (slug: string, updatedService: Service) => {
     try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/services/${slug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(updatedService),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setServices(prev => prev.map(s => (s.slug === slug ? data : s)));
    } catch (error: any) {
        alert(`Error updating service: ${error.message}`);
        throw error;
    }
  };

  const deleteService = async (slug:string) => {
     try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/services/${slug}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        setServices(prev => prev.filter(s => s.slug !== slug));
    } catch (error: any) {
        alert(`Error deleting service: ${error.message}`);
        throw error;
    }
  };


  return (
    <ServicesContext.Provider value={{ services, getServiceBySlug, addService, updateService, deleteService }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};
