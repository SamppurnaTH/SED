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
  highlights: string[];
  learningObjectives: string[];
  instructor: Instructor;
}


export interface Partner {
  name: string;
  logoUrl: string;
  websiteUrl: string;
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