
// Helper to transform string topics to object topics
const toTopics = (topics) => topics.map(t => ({ 
    title: t, 
    videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0', // Gangnam style as placeholder or a tech talk
    content: `In this lesson, we explore the fundamentals of **${t}**. \n\nKey takeaways include understanding the core syntax, best practices, and real-world applications. Practice by writing your own code snippets and reviewing the documentation.` 
}));

let courses = [
  {
    name: 'Full Stack Development',
    slug: 'full-stack-development',
    tagline: 'From frontend to backend, become a complete web developer.',
    description: 'Our Full Stack Development program is an immersive journey into the world of web applications. You will master the MERN stack (MongoDB, Express.js, React, Node.js) through hands-on projects.',
    points: ['Real-time projects', 'Mentor guidance', 'Certification'],
    category: 'Web Development',
    imageUrl: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=2070&auto=format&fit=crop',
    duration: '8 Weeks Intensive Program',
    highlights: ['Build 5+ Real-World Projects', 'Master MERN Stack', '1-on-1 Mentorship Sessions', 'Dedicated Career Support'],
    learningObjectives: [
      'Design responsive user interfaces with React and Tailwind CSS.',
      'Build robust server-side APIs with Node.js & Express.',
      'Manage complex databases with MongoDB and Mongoose.',
      'Implement user authentication and authorization.',
      'Deploy full-stack applications to cloud platforms like Vercel or AWS.'
    ],
    instructor: {
      name: 'Priya Sharma',
      title: 'Senior Software Engineer @ TechCorp',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
      bio: 'Priya is a seasoned full-stack developer with over 8 years of experience building scalable web applications for leading tech companies.',
    },
    pricing: {
      amount: 75000,
      currency: 'INR',
      note: 'EMI options available starting at ₹6,250/month.',
      inclusions: ['Lifetime access to course materials', 'Dedicated placement support', 'Certificate of Completion', '1:1 with industry mentors']
    },
    curriculum: [
      { week: 1, title: 'Frontend Foundations', topics: toTopics(['Semantic HTML5', 'Advanced CSS, Flexbox, Grid', 'Responsive Design', 'Version Control with Git & GitHub']) },
      { week: 2, title: 'JavaScript Fundamentals', topics: toTopics(['Data Types & Variables', 'Functions & Scope', 'DOM Manipulation', 'ES6+ Features']) },
      { week: 3, title: 'Deep Dive into React', topics: toTopics(['Components, Props & State', 'React Hooks', 'React Router', 'State Management']) },
      { week: 4, title: 'Backend with Node.js', topics: toTopics(['Building RESTful APIs', 'Middleware & Routing', 'Async/Await', 'Connecting to Databases']) },
      { week: 5, title: 'Database Management', topics: toTopics(['NoSQL Concepts', 'CRUD with Mongoose', 'Data Modeling', 'Indexing']) },
      { week: 6, title: 'Full Stack Integration', topics: toTopics(['Connecting Frontend to Backend', 'JWT Authentication', 'Password Hashing', 'Protected Routes']) },
      { week: 7, title: 'Advanced Topics', topics: toTopics(['WebSockets', 'Testing', 'Deployment', 'CI/CD Basics']) },
      { week: 8, title: 'Capstone Project', topics: toTopics(['Project Planning', 'Building MERN App', 'Code Reviews', 'Final Presentation']) }
    ],
    projects: [
      { title: 'E-commerce Platform', description: 'Build a complete e-commerce site with product listings, a shopping cart, user authentication, and an admin panel.', imageUrl: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop' },
      { title: 'Real-time Chat Application', description: 'Develop a chat application using WebSockets, allowing multiple users to communicate in real-time.', imageUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2070&auto=format&fit=crop' },
    ],
    faqs: [
      { question: "Is this course suitable for beginners?", answer: "Absolutely! This course starts from the very basics." },
      { question: "What kind of placement support can I expect?", answer: "We provide comprehensive placement support including resume building and mock interviews." }
    ],
    deadlines: [
      { date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), task: 'Submit Project 1' },
      { date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), task: 'Mid-term Quiz' },
    ]
  },
  // Other courses would follow similar structure...
];

let partners = [
  { 
    name: 'TCS', 
    slug: 'tcs',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg', 
    websiteUrl: 'https://www.tcs.com/careers', 
    description: 'A global leader in IT services, consulting, and business solutions.',
    bannerImageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4be3?q=80&w=2070&auto=format&fit=crop',
    longDescription: 'Tata Consultancy Services (TCS) is an IT services, consulting and business solutions organization.',
    hiringRoles: ['Full Stack Developer', 'Data Analyst', 'Cloud Engineer'],
    contact: { email: 'careers@tcs.com', phone: '+91-22-6778-9595' }
  },
  // ... (rest of partners, shortened for brevity but assume full list in real file)
];

let services = [
  {
    title: 'Corporate Training',
    slug: 'corporate-training',
    tagline: 'Upskill your workforce with cutting-edge tech programs.',
    description: 'We partner with organizations to deliver customized training programs.',
    features: ['Customized curriculum', 'Expert industry trainers', 'Flexible delivery models'],
  },
  // ...
];

let blogPosts = [
  {
    slug: 'why-full-stack-development-is-still-in-demand',
    title: 'Why Full Stack Development is Still in High Demand in 2024',
    content: 'Full stack development continues to be one of the most sought-after skills...',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
    category: 'Web Development',
    tags: ['full stack', 'web development'],
    author: { name: 'Priya Sharma', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop' },
    publishedDate: new Date().toISOString()
  }
];

let submissions = [];
let userProgress = {};
let savedCourses = {};

export {
  courses,
  partners,
  services,
  blogPosts,
  submissions,
  userProgress,
  savedCourses,
  toTopics
};
