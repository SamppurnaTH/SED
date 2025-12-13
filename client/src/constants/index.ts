import { Building, GraduationCap, Users, Code } from 'lucide-react';

// Notification related types and data
export interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: 'New Course Available',
    message: 'A new course on Advanced React has been added to your learning path.',
    timestamp: '2025-11-25T10:30:00Z',
    read: false,
    type: 'info'
  },
  {
    id: 2,
    title: 'Assignment Due',
    message: 'Your assignment for "Introduction to TypeScript" is due in 2 days.',
    timestamp: '2025-11-24T14:15:00Z',
    read: false,
    type: 'warning'
  },
  {
    id: 3,
    title: 'Course Completed',
    message: 'Congratulations! You have successfully completed the JavaScript Fundamentals course.',
    timestamp: '2025-11-23T09:45:00Z',
    read: true,
    type: 'success'
  },
  {
    id: 4,
    title: 'System Maintenance',
    message: 'Scheduled maintenance is planned for this weekend. The platform will be unavailable for 2 hours.',
    timestamp: '2025-11-22T16:20:00Z',
    read: true,
    type: 'info'
  }
];

// Instructor related types and data
export interface Instructor {
  name: string;
  role: string;
  bio: string;
  rating: number;
  students: number;
  courses: number;
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    website?: string;
    email?: string;
  };
  about: string;
  experience: string;
  teachingStyle: string;
  reviews: number;
  skills: string[];
}

export const INSTRUCTORS: Instructor[] = [
  {
    name: 'John Doe',
    role: 'Senior Frontend Developer',
    bio: '10+ years of experience in web development',
    rating: 4.9,
    students: 12500,
    courses: 8,
    image: '/instructors/john-doe.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
      website: 'https://johndoe.dev',
      email: 'john@example.com'
    },
    reviews: 2540,
    skills: ['React', 'TypeScript', 'Node.js', 'Next.js'],
    about: 'Passionate about teaching modern web development with a focus on React, TypeScript, and modern JavaScript.',
    experience: '10+ years in web development, previously at Google and Microsoft',
    teachingStyle: 'Hands-on with real-world projects and examples'
  },
  {
    name: 'Jane Smith',
    role: 'Full Stack Developer',
    bio: 'Specializing in React, Node.js, and GraphQL',
    rating: 4.8,
    students: 9800,
    courses: 6,
    image: '/instructors/jane-smith.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/janesmith',
      twitter: 'https://twitter.com/janesmith',
      website: 'https://janesmith.dev',
      email: 'jane@example.com'
    },
    reviews: 1890,
    skills: ['Node.js', 'Express', 'MongoDB', 'GraphQL'],
    about: 'Full-stack developer with a passion for building scalable applications and teaching others.',
    experience: '8+ years in full-stack development, previously at Amazon and Uber',
    teachingStyle: 'Project-based learning with clear explanations'
  }
];

// Course related types and data
export interface Course {
  id: string | number;
  title: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  duration: string;
  students: number;
  rating: number;
  image: string;
  description: string;
  whatYouWillLearn?: string[];
  requirements?: string[];
  category: string;
  price: number | string;
  lessons: number;
  icon?: string;
}

export const COURSES: Course[] = [
  {
    id: 'react-advanced',
    title: 'Advanced React Patterns',
    instructor: 'John Doe',
    level: 'Advanced',
    duration: '8 weeks',
    students: 3500,
    rating: 4.9,
    image: '/courses/react-advanced.jpg',
    description: 'Master advanced React patterns and techniques used by senior developers.',
    whatYouWillLearn: [
      'Advanced React hooks and custom hooks',
      'Performance optimization techniques',
      'State management at scale',
      'Advanced component composition',
      'Testing React applications'
    ],
    requirements: [
      'JavaScript ES6+',
      'React fundamentals',
      'Basic understanding of hooks'
    ],
    category: 'Development',
    price: 4999,
    lessons: 42
  },
  {
    id: 'nodejs-masterclass',
    title: 'Node.js Masterclass',
    instructor: 'Jane Smith',
    level: 'Intermediate',
    duration: '10 weeks',
    students: 4200,
    rating: 4.8,
    image: '/courses/nodejs-masterclass.jpg',
    description: 'Build scalable and efficient server-side applications with Node.js.',
    whatYouWillLearn: [
      'Asynchronous JavaScript',
      'Building RESTful APIs with Express',
      'Authentication and authorization',
      'Database integration',
      'Deployment and scaling'
    ],
    requirements: [
      'JavaScript fundamentals',
      'Basic understanding of HTTP',
      'Familiarity with command line'
    ],
    category: 'Development',
    price: 3999,
    lessons: 35
  }
];

// Navigation Links
export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Courses', href: '#courses' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' }
];

// Services
export const ALL_SERVICES = [
  {
    id: 'corporate-training',
    title: 'Corporate Training',
    description: 'Customized technical training programs for your workforce.',
    icon: Building,
    features: ['Custom Curriculum', 'On-site/Remote', 'Progress Tracking'],
    caseStudies: [
      {
        title: 'Tech Corp Upskilling',
        desc: 'Trained 50+ developers in React and Node.js.',
        client: 'Tech Corp',
        outcome: '30% productivity boost'
      }
    ],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    longDescription: 'Our corporate training programs are designed to upskill your entire workforce with the latest technologies and best practices.',
    process: [
      { title: 'Assessment', desc: 'We assess your team\'s current skills and identify gaps.' },
      { title: 'Custom Curriculum', desc: 'We design a tailored training program for your needs.' },
      { title: 'Delivery', desc: 'Expert trainers deliver engaging sessions on-site or remotely.' },
      { title: 'Evaluation', desc: 'We track progress and provide detailed reports.' }
    ]
  },
  {
    id: 'university-partnership',
    title: 'University Partnership',
    description: 'Curriculum support and workshops for universities.',
    icon: GraduationCap,
    features: ['Curriculum Design', 'Guest Lectures', 'Faculty Development'],
    caseStudies: [
      {
        title: 'University Curriculum Revamp',
        desc: 'Modernized CS curriculum for 500+ students.',
        client: 'City University',
        outcome: '90% placement rate'
      }
    ],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
    longDescription: 'Partner with us to modernize your university curriculum and provide students with industry-relevant skills.'
  },
  {
    id: 'career-mentorship',
    title: 'Career Mentorship',
    description: '1-on-1 guidance for aspiring developers.',
    icon: Users,
    features: ['Resume Review', 'Mock Interviews', 'Career Path Planning'],
    caseStudies: [
      {
        title: 'Career Switch Success',
        desc: 'Guided a marketing professional to become a frontend developer.',
        client: 'John D.',
        outcome: 'Hired at top tech firm'
      }
    ],
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop',
    longDescription: 'Get personalized career guidance from industry experts to accelerate your tech career.'
  },
  {
    id: 'industry-workshops',
    title: 'Industry Workshops & Bootcamps',
    description: 'Intensive hands-on workshops on cutting-edge technologies.',
    icon: Code,
    features: ['Latest Tech Stack', 'Real-world Projects', 'Expert Instructors'],
    caseStudies: [
      {
        title: 'AI/ML Bootcamp Success',
        desc: 'Conducted 3-day intensive bootcamp on Machine Learning for 80+ participants.',
        client: 'Tech Enthusiasts',
        outcome: '85% project completion'
      }
    ],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop',
    longDescription: 'Our intensive workshops and bootcamps provide hands-on experience with the latest technologies, helping you stay ahead in the rapidly evolving tech landscape.',
    process: [
      { title: 'Topic Selection', desc: 'Choose from trending technologies and frameworks.' },
      { title: 'Hands-on Sessions', desc: 'Build real projects with expert guidance.' },
      { title: 'Peer Learning', desc: 'Collaborate with fellow learners and share knowledge.' },
      { title: 'Certification', desc: 'Receive completion certificate and project portfolio.' }
    ]
  }
];

// Course Categories
export const COURSE_CATEGORIES = ['All', 'Development', 'Design', 'Business', 'Marketing'];

// FAQ Items
export const FAQ_ITEMS = [
  { question: 'What is the refund policy?', answer: 'We offer a 30-day money-back guarantee.' },
  { question: 'Do I get a certificate?', answer: 'Yes, upon completion of the course.' }
];

// Core Values
export const CORE_VALUES = [
  { title: 'Excellence', description: 'We strive for the highest quality in everything we do.' },
  { title: 'Innovation', description: 'We embrace new technologies and teaching methods.' }
];

// Team Members
export const TEAM_MEMBERS = [
  { name: 'Alice Johnson', role: 'CEO', image: '/team/alice.jpg' },
  { name: 'Bob Smith', role: 'CTO', image: '/team/bob.jpg' }
];

// Success Stories
export interface SuccessStory {
  id: string;
  name: string;
  image: string;
  company: string;
  story: string;
  previousRole: string;
  role: string;
  outcome: string;
}

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    image: '/success-stories/sarah-chen.jpg',
    company: 'Google',
    story: 'After completing the Advanced React course, I landed my dream job at Google. The hands-on projects and mentorship were invaluable in preparing me for real-world challenges.',
    previousRole: 'Junior Developer',
    role: 'Senior Frontend Engineer',
    outcome: '150% Salary Increase'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    image: '/success-stories/michael-rodriguez.jpg',
    company: 'Microsoft',
    story: 'The Node.js Masterclass transformed my career. I went from struggling with backend concepts to confidently building scalable applications. Now I lead a team of developers at Microsoft.',
    previousRole: 'Marketing Manager',
    role: 'Full Stack Developer',
    outcome: 'Career Switch Success'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    image: '/success-stories/priya-sharma.jpg',
    company: 'Amazon',
    story: 'The comprehensive curriculum and industry-relevant projects gave me the confidence to apply for senior positions. Within 2 months of completing the course, I joined Amazon as a Tech Lead.',
    previousRole: 'Frontend Developer',
    role: 'Tech Lead',
    outcome: '120% Salary Hike'
  },
  {
    id: '4',
    name: 'David Kim',
    image: '/success-stories/david-kim.jpg',
    company: 'Startup Founder',
    story: 'The skills I gained helped me build my own SaaS product. The course not only taught me technical skills but also how to think like a product engineer.',
    previousRole: 'Freelancer',
    role: 'Startup Founder & CTO',
    outcome: 'Built $1M ARR Product'
  }
];
