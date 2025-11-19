export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  image?: string;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  // Add other course properties as needed
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'instructor';
  // Add other user properties as needed
}

// Add more shared types as needed
