// FIX: Removed incorrect import of 'FAQ' from './constants'. The 'FAQ' interface
// is defined within this file, so the import was unnecessary and caused a
// circular dependency.

// Add Razorpay type definition
declare global {
  interface Window {
    Razorpay: any;
    csrfToken?: string;
  }
}

export interface Instructor {
  name: string;
  title: string;
  imageUrl: string;
  bio: string;
}

export interface Topic {
  title: string;
  videoUrl?: string;
  content?: string;
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
    topics: Topic[];
  }[];
  projects: {
    title: string;
    description: string;
    imageUrl: string;
  }[];
  faqs: FAQ[];
  deadlines?: { date: string; task: string; }[];
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

// FIX: Add BlogPost interface for blog-related data structures.
export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    imageUrl: string;
  };
  publishedDate: string; // ISO date string
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

export interface GeneratedVideo {
  video: {
    uri: string;
    aspectRatio: string;
  };
}

export interface VideoGenerationResponse {
  generatedVideos: GeneratedVideo[];
}

export interface VideoGenerationOperation {
  name: string;
  done: boolean;
  response?: VideoGenerationResponse;
  error?: any;
}

export interface Order {
  course: Course;
  orderId: string;
  transactionDate: string;
  paymentMethod: string;
}

export interface EnrolledCourseInfo {
  courseSlug: string;
  progress: number;
  completedLessons?: string[]; // New field for LMS
}

// Moved from ToastContext to avoid circular dependencies
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}