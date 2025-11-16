
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Service } from '../types';

interface ServicesContextType {
  services: Service[];
  getServiceBySlug: (slug: string) => Service | undefined;
  addService: (service: Service) => void;
  updateService: (slug: string, updatedService: Service) => void;
  deleteService: (slug: string) => void;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

const initialServices: Service[] = [
  {
    title: 'Corporate Training',
    slug: 'corporate-training',
    tagline: 'Upskill your workforce with cutting-edge tech programs.',
    description: 'We partner with organizations to deliver customized training programs that address specific skill gaps and business objectives. Our curriculum is designed to enhance employee productivity and drive innovation.',
    features: ['Customized curriculum', 'Expert industry trainers', 'Flexible delivery models', 'Measurable impact'],
  },
  {
    title: 'Campus Recruitment Training',
    slug: 'campus-recruitment-training',
    tagline: 'Prepare students for top-tier placements.',
    description: 'Our comprehensive training program equips college students with the technical and soft skills needed to excel in campus recruitment drives. We focus on aptitude, coding, and interview preparation.',
    features: ['Industry-aligned syllabus', 'Mock interviews & assessments', 'Resume building workshops', 'Partnerships with colleges'],
  },
  {
    title: 'Custom Curriculum Development',
    slug: 'custom-curriculum-development',
    tagline: 'Tailored learning content for educational institutions.',
    description: 'We collaborate with colleges and universities to design and develop modern, industry-relevant curricula that make students job-ready from day one.',
    features: ['Focus on practical skills', 'Integration of new technologies', 'Faculty development programs', 'Project-based learning modules'],
  },
  {
    title: 'Career Counseling & Mentorship',
    slug: 'career-counseling',
    tagline: 'Navigate your tech career path with expert guidance.',
    description: 'Our experienced mentors provide one-on-one guidance to help individuals identify their career goals, build a roadmap, and overcome challenges in their professional journey.',
    features: ['Personalized career roadmap', '1-on-1 mentorship sessions', 'Skill gap analysis', 'Industry insights'],
  },
  {
    title: 'Workshops & Webinars',
    slug: 'workshops-webinars',
    tagline: 'Short-term, high-impact learning sessions.',
    description: 'We conduct specialized workshops and webinars on emerging technologies and in-demand skills, providing a platform for continuous learning and professional development.',
    features: ['Led by industry experts', 'Hands-on and interactive', 'Focus on specific tools/technologies', 'Networking opportunities'],
  },
  {
    title: 'Project Incubation',
    slug: 'project-incubation',
    tagline: 'Turn your innovative ideas into real-world projects.',
    description: 'We provide the resources, mentorship, and environment for students and professionals to build and deploy their own tech projects, fostering an entrepreneurial mindset and practical experience.',
    features: ['Guidance from idea to launch', 'Access to tech stack & tools', 'Portfolio-worthy projects', 'Collaboration with peers'],
  },
];


export const ServicesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(initialServices);

  const getServiceBySlug = (slug: string) => {
    return services.find(s => s.slug === slug);
  };

  const addService = (service: Service) => {
    if (services.some(s => s.slug === service.slug)) {
        alert('Error: A service with this slug already exists.');
        return;
    }
    setServices(prev => [...prev, service]);
  };

  const updateService = (slug: string, updatedService: Service) => {
    setServices(prev => prev.map(s => (s.slug === slug ? updatedService : s)));
  };

  const deleteService = (slug:string) => {
    setServices(prev => prev.filter(s => s.slug !== slug));
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
