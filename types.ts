// FIX: Removed incorrect import of 'FAQ' from './constants'. The 'FAQ' interface
// is defined within this file, so the import was unnecessary and caused a
// circular dependency.

export interface Instructor {
  name: string;
  title: string;
  imageUrl: string;
  bio: string;
}

export interface Course {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  points: string[];
  category: string;
  imageUrl: string;
  duration: string;
  highlights: string[];
  learningObjectives: string[];
  instructor: Instructor;
  pricing: {
    amount: number;
    currency: 'INR';
    note: string;
    inclusions: string[];
  };
  curriculum: {
    week: number;
    title: string;
    topics: string[];
  }[];
  projects: {
    title: string;
    description: string;
    imageUrl: string;
  }[];
  faqs: FAQ[];
}


export interface Partner {
  name: string;
  slug: string;
  logoUrl: string;
  websiteUrl: string;
  description: string;
  bannerImageUrl: string;
  longDescription: string;
  hiringRoles: string[];
  contact: {
    email: string;
    phone: string;
  };
}

export interface NavLink {
  name: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  name: string;
  title: string;
  imageUrl: string;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  course: string;
  quote: string;
  imageUrl: string;
}

// FIX: Add the FAQ interface to define the shape of FAQ objects.
export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  features: string[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}