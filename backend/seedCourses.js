require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');

// Helper to transform string topics to object topics
const toTopics = (topics) => topics.map(t => ({
    title: t,
    videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    content: `In this lesson, we explore the fundamentals of **${t}**. \n\nKey takeaways include understanding the core syntax, best practices, and real-world applications. Practice by writing your own code snippets and reviewing the documentation.`
}));

const courses = [
    {
        name: 'Python Programming & Automation',
        slug: 'python-programming-automation',
        tagline: 'Master Python for automation, scripting, and real-world applications.',
        description: 'Learn Python from scratch and build powerful automation scripts. Perfect for beginners and professionals looking to automate repetitive tasks and build efficient solutions.',
        points: ['Hands-on projects', 'Automation scripts', 'Industry certification'],
        category: 'Programming',
        imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2070&auto=format&fit=crop',
        duration: '6 Weeks Intensive Program',
        highlights: ['Build 10+ Automation Scripts', 'Master Python Libraries', 'Web Scraping & APIs', 'Data Processing'],
        learningObjectives: [
            'Master Python fundamentals and OOP concepts.',
            'Build automation scripts for file handling, web scraping, and data processing.',
            'Work with popular libraries like Pandas, NumPy, and Requests.',
            'Create REST API clients and automate workflows.',
            'Deploy Python applications and scripts.'
        ],
        instructor: {
            name: 'Rajesh Kumar',
            title: 'Senior Python Developer @ Tech Solutions',
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
            bio: 'Rajesh has 10+ years of experience in Python development and automation, helping companies streamline their workflows.',
        },
        pricing: {
            amount: 45000,
            currency: 'INR',
            note: 'EMI options available starting at ₹3,750/month.',
            inclusions: ['Lifetime access to course materials', 'Dedicated placement support', 'Certificate of Completion', '1:1 with industry mentors']
        },
        curriculum: [
            { week: 1, title: 'Python Basics', topics: toTopics(['Variables & Data Types', 'Control Flow', 'Functions', 'File Handling']) },
            { week: 2, title: 'OOP & Advanced Concepts', topics: toTopics(['Classes & Objects', 'Inheritance', 'Exception Handling', 'Decorators']) },
            { week: 3, title: 'Libraries & Frameworks', topics: toTopics(['NumPy & Pandas', 'Requests & BeautifulSoup', 'Working with APIs', 'JSON Processing']) },
            { week: 4, title: 'Web Scraping', topics: toTopics(['Selenium Basics', 'Scraping Dynamic Content', 'Data Extraction', 'Ethics & Best Practices']) },
            { week: 5, title: 'Automation Projects', topics: toTopics(['File Automation', 'Email Automation', 'Task Scheduling', 'Report Generation']) },
            { week: 6, title: 'Capstone Project', topics: toTopics(['Project Planning', 'Building Automation Tool', 'Testing & Debugging', 'Final Presentation']) }
        ],
        projects: [
            { title: 'Web Scraper', description: 'Build a web scraper to extract data from e-commerce sites and generate reports.', imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop' },
            { title: 'Email Automation Bot', description: 'Create an automation bot to send personalized emails and track responses.', imageUrl: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=2074&auto=format&fit=crop' },
        ],
        faqs: [
            { question: "Do I need prior programming experience?", answer: "No! This course is designed for complete beginners." },
            { question: "What tools will I need?", answer: "Just a computer with Python installed. We'll guide you through the setup." }
        ]
    },

    {
        name: 'Full Stack Web Development (MERN / Django)',
        slug: 'full-stack-web-development',
        tagline: 'Frontend + backend + deployment - become a complete web developer.',
        description: 'Master both MERN stack (MongoDB, Express, React, Node.js) and Django to build modern, scalable web applications from scratch to deployment.',
        points: ['Real-time projects', 'Mentor guidance', 'Certification'],
        category: 'Web Development',
        imageUrl: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=2070&auto=format&fit=crop',
        duration: '12 Weeks Intensive Program',
        highlights: ['Build 8+ Real-World Projects', 'Master MERN & Django', '1-on-1 Mentorship Sessions', 'Dedicated Career Support'],
        learningObjectives: [
            'Design responsive user interfaces with React and modern CSS.',
            'Build robust server-side APIs with Node.js, Express & Django.',
            'Manage complex databases with MongoDB and PostgreSQL.',
            'Implement user authentication and authorization.',
            'Deploy full-stack applications to cloud platforms like Vercel, AWS, or Heroku.'
        ],
        instructor: {
            name: 'Priya Sharma',
            title: 'Senior Software Engineer @ TechCorp',
            imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
            bio: 'Priya is a seasoned full-stack developer with over 8 years of experience building scalable web applications for leading tech companies.',
        },
        pricing: {
            amount: 85000,
            currency: 'INR',
            note: 'EMI options available starting at ₹7,083/month.',
            inclusions: ['Lifetime access to course materials', 'Dedicated placement support', 'Certificate of Completion', '1:1 with industry mentors']
        },
        curriculum: [
            { week: 1, title: 'Frontend Foundations', topics: toTopics(['HTML5 & CSS3', 'JavaScript ES6+', 'Responsive Design', 'Git & GitHub']) },
            { week: 2, title: 'React Fundamentals', topics: toTopics(['Components & Props', 'State & Hooks', 'React Router', 'Context API']) },
            { week: 3, title: 'Advanced React', topics: toTopics(['Redux Toolkit', 'API Integration', 'Performance Optimization', 'Testing']) },
            { week: 4, title: 'Backend with Node.js', topics: toTopics(['Express.js Setup', 'RESTful APIs', 'Middleware', 'Error Handling']) },
            { week: 5, title: 'Database - MongoDB', topics: toTopics(['NoSQL Concepts', 'Mongoose ODM', 'CRUD Operations', 'Data Modeling']) },
            { week: 6, title: 'Authentication & Security', topics: toTopics(['JWT Tokens', 'Password Hashing', 'OAuth 2.0', 'Security Best Practices']) },
            { week: 7, title: 'Django Framework', topics: toTopics(['Django Setup', 'Models & ORM', 'Views & Templates', 'Django REST Framework']) },
            { week: 8, title: 'PostgreSQL & Advanced DB', topics: toTopics(['SQL Fundamentals', 'Relationships', 'Migrations', 'Query Optimization']) },
            { week: 9, title: 'Full Stack Integration', topics: toTopics(['Connecting Frontend to Backend', 'File Uploads', 'Real-time Features', 'WebSockets']) },
            { week: 10, title: 'Testing & Quality', topics: toTopics(['Unit Testing', 'Integration Testing', 'E2E Testing', 'Code Quality']) },
            { week: 11, title: 'Deployment & DevOps', topics: toTopics(['Docker Basics', 'CI/CD Pipelines', 'AWS/Vercel Deployment', 'Monitoring']) },
            { week: 12, title: 'Capstone Project', topics: toTopics(['Project Planning', 'Building Full Stack App', 'Code Reviews', 'Final Presentation']) }
        ],
        projects: [
            { title: 'E-commerce Platform', description: 'Build a complete e-commerce site with product listings, shopping cart, payment integration, and admin panel.', imageUrl: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop' },
            { title: 'Social Media App', description: 'Create a social media platform with user profiles, posts, comments, and real-time notifications.', imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074&auto=format&fit=crop' },
        ],
        faqs: [
            { question: "Should I learn MERN or Django?", answer: "You'll learn both! This gives you flexibility to choose based on project requirements." },
            { question: "What kind of placement support can I expect?", answer: "We provide comprehensive placement support including resume building, mock interviews, and job referrals." }
        ]
    },

    {
        name: 'Java Full Stack (Spring Boot + React)',
        slug: 'java-full-stack',
        tagline: 'Java backend + modern frontend - enterprise-grade development.',
        description: 'Master enterprise Java development with Spring Boot and build modern frontends with React. Perfect for building scalable, production-ready applications.',
        points: ['Enterprise projects', 'Spring Boot mastery', 'Industry certification'],
        category: 'Web Development',
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
        duration: '12 Weeks Intensive Program',
        highlights: ['Build Enterprise Applications', 'Master Spring Boot & React', 'Microservices Architecture', 'Cloud Deployment'],
        learningObjectives: [
            'Master Java fundamentals and OOP principles.',
            'Build RESTful APIs with Spring Boot and Spring Data JPA.',
            'Implement security with Spring Security and JWT.',
            'Create modern UIs with React and TypeScript.',
            'Deploy microservices to cloud platforms.'
        ],
        instructor: {
            name: 'Amit Patel',
            title: 'Lead Java Architect @ Enterprise Solutions',
            imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
            bio: 'Amit has 12+ years of experience in Java enterprise development and has architected solutions for Fortune 500 companies.',
        },
        pricing: {
            amount: 90000,
            currency: 'INR',
            note: 'EMI options available starting at ₹7,500/month.',
            inclusions: ['Lifetime access to course materials', 'Dedicated placement support', 'Certificate of Completion', '1:1 with industry mentors']
        },
        curriculum: [
            { week: 1, title: 'Java Fundamentals', topics: toTopics(['Java Basics', 'OOP Concepts', 'Collections Framework', 'Exception Handling']) },
            { week: 2, title: 'Advanced Java', topics: toTopics(['Multithreading', 'Streams API', 'Lambda Expressions', 'Functional Programming']) },
            { week: 3, title: 'Spring Framework', topics: toTopics(['Dependency Injection', 'Spring Core', 'Spring MVC', 'Spring Configuration']) },
            { week: 4, title: 'Spring Boot', topics: toTopics(['Spring Boot Basics', 'Auto Configuration', 'Spring Boot Starters', 'Application Properties']) },
            { week: 5, title: 'Spring Data JPA', topics: toTopics(['JPA Basics', 'Entity Relationships', 'Repository Pattern', 'Query Methods']) },
            { week: 6, title: 'Spring Security', topics: toTopics(['Authentication', 'Authorization', 'JWT Implementation', 'OAuth 2.0']) },
            { week: 7, title: 'React & TypeScript', topics: toTopics(['React Fundamentals', 'TypeScript Basics', 'Component Design', 'State Management']) },
            { week: 8, title: 'Full Stack Integration', topics: toTopics(['REST API Consumption', 'Axios & Fetch', 'Error Handling', 'Form Validation']) },
            { week: 9, title: 'Microservices', topics: toTopics(['Microservices Architecture', 'Service Discovery', 'API Gateway', 'Load Balancing']) },
            { week: 10, title: 'Testing', topics: toTopics(['JUnit 5', 'Mockito', 'Integration Testing', 'React Testing Library']) },
            { week: 11, title: 'Deployment', topics: toTopics(['Docker & Kubernetes', 'CI/CD with Jenkins', 'AWS Deployment', 'Monitoring']) },
            { week: 12, title: 'Capstone Project', topics: toTopics(['Project Planning', 'Building Enterprise App', 'Code Reviews', 'Final Presentation']) }
        ],
        projects: [
            { title: 'Banking System', description: 'Build a complete banking application with account management, transactions, and reporting.', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop' },
            { title: 'Inventory Management', description: 'Create an enterprise inventory system with real-time tracking and analytics.', imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop' },
        ],
        faqs: [
            { question: "Is Java still relevant in 2024?", answer: "Absolutely! Java powers most enterprise applications and is in high demand." },
            { question: "Will I learn microservices?", answer: "Yes! You'll learn to build and deploy microservices architecture." }
        ]
    },

    {
        name: 'C & C++ with DSA',
        slug: 'c-cpp-dsa',
        tagline: 'Core programming foundation - master the fundamentals.',
        description: 'Build a rock-solid foundation in programming with C and C++. Master Data Structures and Algorithms to ace technical interviews and competitive programming.',
        points: ['Strong fundamentals', 'DSA mastery', 'Interview preparation'],
        category: 'Programming',
        imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop',
        duration: '10 Weeks Intensive Program',
        highlights: ['Master C & C++ Programming', 'Complete DSA Coverage', 'Solve 200+ Problems', 'Interview Preparation'],
        learningObjectives: [
            'Master C and C++ programming languages.',
            'Understand memory management and pointers.',
            'Implement all major data structures from scratch.',
            'Solve algorithmic problems efficiently.',
            'Prepare for technical interviews at top companies.'
        ],
        instructor: {
            name: 'Dr. Suresh Reddy',
            title: 'Computer Science Professor & Competitive Programmer',
            imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop',
            bio: 'Dr. Reddy has taught programming to 10,000+ students and is a 6-star coder on CodeChef.',
        },
        pricing: {
            amount: 55000,
            currency: 'INR',
            note: 'EMI options available starting at ₹4,583/month.',
            inclusions: ['Lifetime access to course materials', 'Dedicated placement support', 'Certificate of Completion', '1:1 with industry mentors']
        },
        curriculum: [
            { week: 1, title: 'C Programming Basics', topics: toTopics(['Variables & Data Types', 'Control Structures', 'Functions', 'Arrays & Strings']) },
            { week: 2, title: 'Advanced C', topics: toTopics(['Pointers', 'Dynamic Memory', 'Structures', 'File Handling']) },
            { week: 3, title: 'C++ Fundamentals', topics: toTopics(['OOP Concepts', 'Classes & Objects', 'Inheritance', 'Polymorphism']) },
            { week: 4, title: 'Advanced C++', topics: toTopics(['Templates', 'STL Containers', 'Iterators', 'Exception Handling']) },
            { week: 5, title: 'Linear Data Structures', topics: toTopics(['Arrays', 'Linked Lists', 'Stacks', 'Queues']) },
            { week: 6, title: 'Non-Linear Data Structures', topics: toTopics(['Trees', 'Binary Search Trees', 'Heaps', 'Graphs']) },
            { week: 7, title: 'Searching & Sorting', topics: toTopics(['Binary Search', 'Quick Sort', 'Merge Sort', 'Heap Sort']) },
            { week: 8, title: 'Advanced Algorithms', topics: toTopics(['Dynamic Programming', 'Greedy Algorithms', 'Backtracking', 'Divide & Conquer']) },
            { week: 9, title: 'Graph Algorithms', topics: toTopics(['BFS & DFS', 'Shortest Path', 'Minimum Spanning Tree', 'Topological Sort']) },
            { week: 10, title: 'Interview Preparation', topics: toTopics(['Problem Solving Patterns', 'Time Complexity', 'Mock Interviews', 'Competitive Programming']) }
        ],
        projects: [
            { title: 'Custom STL Implementation', description: 'Build your own implementation of STL containers like vector, list, and map.', imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop' },
            { title: 'Graph Visualization Tool', description: 'Create a tool to visualize graph algorithms like Dijkstra and Kruskal.', imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2070&auto=format&fit=crop' },
        ],
        faqs: [
            { question: "Why learn C/C++ when there are modern languages?", answer: "C/C++ teaches you how computers work at a fundamental level, making you a better programmer overall." },
            { question: "Will this help me crack FAANG interviews?", answer: "Absolutely! DSA is the core of technical interviews at top companies." }
        ]
    },

    {
        name: 'Mobile App Development (Flutter / React Native)',
        slug: 'mobile-app-development',
        tagline: 'Cross-platform app building - iOS & Android from one codebase.',
        description: 'Learn to build beautiful, high-performance mobile apps for both iOS and Android using Flutter and React Native. One codebase, multiple platforms.',
        points: ['Cross-platform development', 'Real apps', 'App Store deployment'],
        category: 'Mobile Development',
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
        duration: '10 Weeks Intensive Program',
        highlights: ['Build 6+ Mobile Apps', 'Master Flutter & React Native', 'Publish to App Stores', 'Backend Integration'],
        learningObjectives: [
            'Build cross-platform mobile apps with Flutter and React Native.',
            'Design beautiful, responsive UIs for mobile devices.',
            'Integrate with REST APIs and Firebase.',
            'Implement push notifications and local storage.',
            'Publish apps to Google Play Store and Apple App Store.'
        ],
        instructor: {
            name: 'Sneha Gupta',
            title: 'Senior Mobile Developer @ AppTech',
            imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
            bio: 'Sneha has built 50+ mobile apps with millions of downloads and specializes in cross-platform development.',
        },
        pricing: {
            amount: 70000,
            currency: 'INR',
            note: 'EMI options available starting at ₹5,833/month.',
            inclusions: ['Lifetime access to course materials', 'Dedicated placement support', 'Certificate of Completion', '1:1 with industry mentors']
        },
        curriculum: [
            { week: 1, title: 'Mobile Dev Fundamentals', topics: toTopics(['Mobile UI/UX Principles', 'Dart Basics', 'JavaScript for React Native', 'Development Environment Setup']) },
            { week: 2, title: 'Flutter Basics', topics: toTopics(['Widgets', 'Layouts', 'Navigation', 'State Management']) },
            { week: 3, title: 'Advanced Flutter', topics: toTopics(['Provider & Riverpod', 'Animations', 'Custom Widgets', 'Platform Channels']) },
            { week: 4, title: 'React Native Basics', topics: toTopics(['Components', 'Styling', 'Navigation', 'Expo vs CLI']) },
            { week: 5, title: 'Advanced React Native', topics: toTopics(['Redux', 'Native Modules', 'Performance Optimization', 'Debugging']) },
            { week: 6, title: 'Backend Integration', topics: toTopics(['REST APIs', 'Firebase', 'Authentication', 'Real-time Database']) },
            { week: 7, title: 'Device Features', topics: toTopics(['Camera & Gallery', 'GPS & Maps', 'Push Notifications', 'Local Storage']) },
            { week: 8, title: 'Advanced Features', topics: toTopics(['Payment Integration', 'Social Login', 'Deep Linking', 'Analytics']) },
            { week: 9, title: 'Testing & Deployment', topics: toTopics(['Unit Testing', 'Widget Testing', 'App Store Guidelines', 'Publishing Process']) },
            { week: 10, title: 'Capstone Project', topics: toTopics(['Project Planning', 'Building Complete App', 'Testing', 'App Store Submission']) }
        ],
        projects: [
            { title: 'Food Delivery App', description: 'Build a complete food delivery app with real-time tracking, payment integration, and user reviews.', imageUrl: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=2071&auto=format&fit=crop' },
            { title: 'Fitness Tracker', description: 'Create a fitness tracking app with workout plans, progress tracking, and social features.', imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop' },
        ],
        faqs: [
            { question: "Flutter or React Native - which is better?", answer: "Both are excellent! You'll learn both and can choose based on project requirements." },
            { question: "Can I publish apps without a Mac?", answer: "For Android, yes! For iOS, you'll need access to a Mac for final publishing." }
        ]
    },

    {
        name: 'UI/UX Design with Figma',
        slug: 'ui-ux-design-figma',
        tagline: 'Design thinking + prototyping - create stunning user experiences.',
        description: 'Master the art and science of UI/UX design. Learn design thinking, user research, wireframing, prototyping, and create pixel-perfect designs in Figma.',
        points: ['Design thinking', 'Figma mastery', 'Portfolio projects'],
        category: 'Design',
        imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064&auto=format&fit=crop',
        duration: '8 Weeks Intensive Program',
        highlights: ['Build Design Portfolio', 'Master Figma', 'User Research', 'Design Systems'],
        learningObjectives: [
            'Understand design thinking and user-centered design principles.',
            'Conduct user research and create user personas.',
            'Design wireframes, mockups, and interactive prototypes.',
            'Master Figma for professional UI design.',
            'Build a portfolio of real-world design projects.'
        ],
        instructor: {
            name: 'Kavya Menon',
            title: 'Lead Product Designer @ DesignHub',
            imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
            bio: 'Kavya has designed products used by millions and has won multiple design awards for her innovative work.',
        },
        pricing: {
            amount: 50000,
            currency: 'INR',
            note: 'EMI options available starting at ₹4,167/month.',
            inclusions: ['Lifetime access to course materials', 'Dedicated placement support', 'Certificate of Completion', '1:1 with industry mentors']
        },
        curriculum: [
            { week: 1, title: 'Design Fundamentals', topics: toTopics(['Design Principles', 'Color Theory', 'Typography', 'Layout & Composition']) },
            { week: 2, title: 'User Research', topics: toTopics(['User Interviews', 'Surveys', 'User Personas', 'Journey Mapping']) },
            { week: 3, title: 'Wireframing', topics: toTopics(['Low-Fidelity Wireframes', 'Information Architecture', 'User Flows', 'Sketching']) },
            { week: 4, title: 'Figma Mastery', topics: toTopics(['Figma Basics', 'Components', 'Auto Layout', 'Variants']) },
            { week: 5, title: 'UI Design', topics: toTopics(['High-Fidelity Mockups', 'Design Systems', 'Responsive Design', 'Accessibility']) },
            { week: 6, title: 'Prototyping', topics: toTopics(['Interactive Prototypes', 'Animations', 'Micro-interactions', 'User Testing']) },
            { week: 7, title: 'Advanced Topics', topics: toTopics(['Design Handoff', 'Collaboration', 'Design Tokens', 'Version Control']) },
            { week: 8, title: 'Portfolio Project', topics: toTopics(['Project Selection', 'End-to-End Design', 'Case Study', 'Presentation']) }
        ],
        projects: [
            { title: 'E-commerce App Design', description: 'Design a complete e-commerce mobile app with user research, wireframes, and high-fidelity prototypes.', imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop' },
            { title: 'SaaS Dashboard', description: 'Create a professional dashboard design for a SaaS product with data visualization and complex workflows.', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' },
        ],
        faqs: [
            { question: "Do I need design experience?", answer: "No! This course is perfect for beginners with no prior design experience." },
            { question: "Will I get a job as a UI/UX designer?", answer: "With a strong portfolio and our placement support, you'll be well-positioned for design roles." }
        ]
    },

    {
        name: 'DevOps & Cloud (AWS / Docker / CI/CD)',
        slug: 'devops-cloud',
        tagline: 'Deployment pipelines - automate and scale your applications.',
        description: 'Master DevOps practices and cloud technologies. Learn Docker, Kubernetes, AWS, CI/CD pipelines, and Infrastructure as Code to deploy and manage applications at scale.',
        points: ['Cloud mastery', 'Automation', 'Industry certification'],
        category: 'DevOps',
        imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2032&auto=format&fit=crop',
        duration: '10 Weeks Intensive Program',
        highlights: ['Master AWS & Azure', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code'],
        learningObjectives: [
            'Understand DevOps culture and practices.',
            'Master Docker containerization and Kubernetes orchestration.',
            'Deploy and manage applications on AWS.',
            'Build automated CI/CD pipelines with Jenkins and GitHub Actions.',
            'Implement Infrastructure as Code with Terraform.'
        ],
        instructor: {
            name: 'Vikram Singh',
            title: 'DevOps Architect @ CloudTech',
            imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop',
            bio: 'Vikram has architected cloud infrastructure for startups and enterprises, managing systems serving millions of users.',
        },
        pricing: {
            amount: 75000,
            currency: 'INR',
            note: 'EMI options available starting at ₹6,250/month.',
            inclusions: ['Lifetime access to course materials', 'Dedicated placement support', 'Certificate of Completion', '1:1 with industry mentors', 'AWS Credits']
        },
        curriculum: [
            { week: 1, title: 'DevOps Fundamentals', topics: toTopics(['DevOps Culture', 'Linux Basics', 'Shell Scripting', 'Git Advanced']) },
            { week: 2, title: 'Docker', topics: toTopics(['Containerization Basics', 'Dockerfile', 'Docker Compose', 'Docker Networking']) },
            { week: 3, title: 'Kubernetes', topics: toTopics(['K8s Architecture', 'Pods & Services', 'Deployments', 'ConfigMaps & Secrets']) },
            { week: 4, title: 'AWS Fundamentals', topics: toTopics(['EC2', 'S3', 'RDS', 'VPC']) },
            { week: 5, title: 'Advanced AWS', topics: toTopics(['ECS & EKS', 'Lambda', 'CloudFormation', 'IAM']) },
            { week: 6, title: 'CI/CD Pipelines', topics: toTopics(['Jenkins', 'GitHub Actions', 'GitLab CI', 'Pipeline Best Practices']) },
            { week: 7, title: 'Infrastructure as Code', topics: toTopics(['Terraform Basics', 'Terraform Modules', 'Ansible', 'Configuration Management']) },
            { week: 8, title: 'Monitoring & Logging', topics: toTopics(['Prometheus', 'Grafana', 'ELK Stack', 'CloudWatch']) },
            { week: 9, title: 'Security & Best Practices', topics: toTopics(['Security Scanning', 'Secrets Management', 'Compliance', 'Cost Optimization']) },
            { week: 10, title: 'Capstone Project', topics: toTopics(['Project Planning', 'Complete DevOps Pipeline', 'Documentation', 'Presentation']) }
        ],
        projects: [
            { title: 'Microservices Deployment', description: 'Deploy a microservices application on Kubernetes with complete CI/CD pipeline and monitoring.', imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop' },
            { title: 'Infrastructure Automation', description: 'Build complete infrastructure on AWS using Terraform with auto-scaling and high availability.', imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop' },
        ],
        faqs: [
            { question: "Do I need programming knowledge?", answer: "Basic programming knowledge is helpful but not required. We'll teach you scripting from scratch." },
            { question: "Will I get AWS certification?", answer: "We prepare you for AWS certifications, and you can take the exam separately." }
        ]
    },

    {
        name: 'Software Testing (Manual + Automation)',
        slug: 'software-testing',
        tagline: 'Selenium + API Testing - ensure quality and reliability.',
        description: 'Master both manual and automation testing. Learn Selenium, API testing, performance testing, and quality assurance practices to ensure software reliability.',
        points: ['Manual & automation', 'Industry tools', 'Certification'],
        category: 'Testing',
        imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2028&auto=format&fit=crop',
        duration: '8 Weeks Intensive Program',
        highlights: ['Manual Testing Mastery', 'Selenium Automation', 'API Testing', 'Performance Testing'],
        learningObjectives: [
            'Understand software testing lifecycle and methodologies.',
            'Perform comprehensive manual testing and create test cases.',
            'Automate web applications using Selenium WebDriver.',
            'Test REST APIs using Postman and RestAssured.',
            'Perform performance testing with JMeter.'
        ],
        instructor: {
            name: 'Meera Krishnan',
            title: 'QA Lead @ TestPro Solutions',
            imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop',
            bio: 'Meera has 10+ years of experience in software testing and has led QA teams for major product releases.',
        },
        pricing: {
            amount: 45000,
            currency: 'INR',
            note: 'EMI options available starting at ₹3,750/month.',
            inclusions: ['Lifetime access to course materials', 'Dedicated placement support', 'Certificate of Completion', '1:1 with industry mentors']
        },
        curriculum: [
            { week: 1, title: 'Testing Fundamentals', topics: toTopics(['SDLC & STLC', 'Testing Types', 'Test Case Design', 'Bug Reporting']) },
            { week: 2, title: 'Manual Testing', topics: toTopics(['Functional Testing', 'Regression Testing', 'UAT', 'Test Management Tools']) },
            { week: 3, title: 'Selenium Basics', topics: toTopics(['WebDriver Setup', 'Locators', 'WebElement Interactions', 'Browser Commands']) },
            { week: 4, title: 'Advanced Selenium', topics: toTopics(['TestNG Framework', 'Page Object Model', 'Data-Driven Testing', 'Cross-Browser Testing']) },
            { week: 5, title: 'API Testing', topics: toTopics(['REST API Basics', 'Postman', 'RestAssured', 'API Automation']) },
            { week: 6, title: 'Performance Testing', topics: toTopics(['JMeter Basics', 'Load Testing', 'Stress Testing', 'Performance Analysis']) },
            { week: 7, title: 'CI/CD Integration', topics: toTopics(['Jenkins Integration', 'Git & Version Control', 'Continuous Testing', 'Reporting']) },
            { week: 8, title: 'Capstone Project', topics: toTopics(['Project Planning', 'Complete Test Suite', 'Automation Framework', 'Final Presentation']) }
        ],
        projects: [
            { title: 'E-commerce Test Suite', description: 'Create a comprehensive test suite for an e-commerce application with both manual and automated tests.', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop' },
            { title: 'API Testing Framework', description: 'Build a complete API testing framework with RestAssured and integrate with CI/CD pipeline.', imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop' },
        ],
        faqs: [
            { question: "Is coding required for testing?", answer: "For manual testing, no. For automation, you'll learn basic programming as part of the course." },
            { question: "What's the job market like for testers?", answer: "Excellent! Quality assurance is critical for every software company." }
        ]
    },

    {
        name: 'Database Management (SQL + MongoDB)',
        slug: 'database-management',
        tagline: 'Queries + mini project - master data storage and retrieval.',
        description: 'Master both SQL and NoSQL databases. Learn to design efficient database schemas, write complex queries, optimize performance, and build data-driven applications.',
        points: ['SQL & NoSQL', 'Query optimization', 'Real projects'],
        category: 'Database',
        imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2036&auto=format&fit=crop',
        duration: '6 Weeks Intensive Program',
        highlights: ['Master SQL & MongoDB', 'Database Design', 'Query Optimization', 'Real-World Projects'],
        learningObjectives: [
            'Design normalized database schemas.',
            'Write complex SQL queries with joins, subqueries, and aggregations.',
            'Master MongoDB for NoSQL data storage.',
            'Optimize database performance and indexing.',
            'Build data-driven applications with proper database integration.'
        ],
        instructor: {
            name: 'Arjun Nair',
            title: 'Database Architect @ DataSystems',
            imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop',
            bio: 'Arjun has designed and optimized databases handling billions of records for high-traffic applications.',
        },
        pricing: {
            amount: 40000,
            currency: 'INR',
            note: 'EMI options available starting at ₹3,333/month.',
            inclusions: ['Lifetime access to course materials', 'Dedicated placement support', 'Certificate of Completion', '1:1 with industry mentors']
        },
        curriculum: [
            { week: 1, title: 'SQL Fundamentals', topics: toTopics(['Database Basics', 'SELECT Queries', 'WHERE & Filtering', 'Sorting & Limiting']) },
            { week: 2, title: 'Advanced SQL', topics: toTopics(['Joins', 'Subqueries', 'Aggregations', 'Window Functions']) },
            { week: 3, title: 'Database Design', topics: toTopics(['Normalization', 'ER Diagrams', 'Constraints', 'Indexes']) },
            { week: 4, title: 'MongoDB Basics', topics: toTopics(['NoSQL Concepts', 'CRUD Operations', 'Data Modeling', 'Aggregation Pipeline']) },
            { week: 5, title: 'Advanced MongoDB', topics: toTopics(['Indexing', 'Replication', 'Sharding', 'Performance Tuning']) },
            { week: 6, title: 'Mini Project', topics: toTopics(['Project Planning', 'Schema Design', 'Implementation', 'Optimization']) }
        ],
        projects: [
            { title: 'Library Management System', description: 'Build a complete library management system with SQL database, complex queries, and reporting.', imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2090&auto=format&fit=crop' },
            { title: 'Social Media Analytics', description: 'Create a MongoDB-based analytics system for social media data with aggregation pipelines.', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' },
        ],
        faqs: [
            { question: "Should I learn SQL or MongoDB?", answer: "Both! SQL for relational data and MongoDB for flexible, document-based storage." },
            { question: "Is this suitable for beginners?", answer: "Yes! We start from the basics and build up to advanced concepts." }
        ]
    }
];

async function seedCourses() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing courses
        console.log('🗑️  Clearing existing courses...');
        await Course.deleteMany({});
        console.log('✅ Existing courses cleared');

        // Insert new courses
        console.log('📚 Inserting new courses...');
        const insertedCourses = await Course.insertMany(courses);
        console.log(`✅ Successfully inserted ${insertedCourses.length} courses`);

        // Display summary
        console.log('\n=== COURSES ADDED ===\n');
        insertedCourses.forEach((course, index) => {
            console.log(`${index + 1}. ${course.name}`);
            console.log(`   Slug: ${course.slug}`);
            console.log(`   Category: ${course.category}`);
            console.log(`   Duration: ${course.duration}`);
            console.log(`   Price: ₹${course.pricing.amount.toLocaleString()}`);
            console.log('');
        });

        console.log('🎉 Course seeding completed successfully!');
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding courses:', error);
        process.exit(1);
    }
}

seedCourses();
