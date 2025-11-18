
// FIX: Import the BlogPost type to be used for the new blogPosts constant.
import { Course, Partner, NavLink, Feature, TeamMember, CoreValue, Testimonial, FAQ, Service, BlogPost } from './types';

export const API_URL = 'http://localhost:3001/api';

// Helper to convert string array to Topic array matching the Course interface
// Updated to include videoUrl and content for rich LMS experience in static/demo mode
const toTopics = (topics: string[]) => topics.map(title => ({ 
  title,
  videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0', // Placeholder video (Psy - Gangnam Style as a generic tech placeholder or replace with specific tech talks)
  content: `### ${title}\n\nIn this lesson, we explore the fundamentals of **${title}**. \n\nKey takeaways include understanding the core syntax, best practices, and real-world applications. Practice by writing your own code snippets and reviewing the documentation.\n\n#### Learning Outcomes:\n- Understand ${title} concepts\n- Apply techniques in project\n- Debug common issues`
}));

export const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Programs', href: '/programs' },
  { name: 'Services', href: '/services' },
  { name: 'Partners', href: '/partners' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const features: Feature[] = [
  {
    title: 'Expert-Led Training',
    description: 'Learn from industry veterans with years of real-world experience in top tech companies.',
    icon: 'ExpertIcon',
  },
  {
    title: 'Project-Based Curriculum',
    description: 'Build a portfolio of real-world projects that showcase your skills to potential employers.',
    icon: 'ProjectIcon',
  },
  {
    title: 'Dedicated Placement Support',
    description: 'Our career services team provides resume building, interview prep, and connects you with our 300+ hiring partners.',
    icon: 'PlacementIcon',
  },
  {
    title: 'Flexible Learning Options',
    description: 'Choose from online, offline, or hybrid learning models to fit your schedule and learning style.',
    icon: 'FlexibleIcon',
  },
];

export const courses: Course[] = [
  {
    name: 'Full Stack Development',
    slug: 'full-stack-development',
    tagline: 'From frontend to backend, become a complete web developer.',
    description: 'Our Full Stack Development program is an immersive journey into the world of web applications. You will master the MERN stack (MongoDB, Express.js, React, Node.js) through hands-on projects, learning to build, test, and deploy dynamic, responsive, and scalable applications from the ground up. This course is designed for aspiring developers who want to gain comprehensive control over the entire development lifecycle.',
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
      bio: 'Priya is a seasoned full-stack developer with over 8 years of experience building scalable web applications for leading tech companies. She is passionate about mentoring the next generation of developers.',
    },
    pricing: {
      amount: 75000,
      currency: 'INR',
      note: 'EMI options available starting at ₹6,250/month.',
      inclusions: ['Lifetime access to course materials', 'Dedicated placement support', 'Certificate of Completion', '1:1 with industry mentors']
    },
    curriculum: [
      { week: 1, title: 'Frontend Foundations: HTML, CSS & Git', topics: toTopics(['Semantic HTML5', 'Advanced CSS, Flexbox, Grid', 'Responsive Design', 'Version Control with Git & GitHub']) },
      { week: 2, title: 'JavaScript Fundamentals', topics: toTopics(['Data Types & Variables', 'Functions & Scope', 'DOM Manipulation', 'ES6+ Features (Arrow Functions, Promises)']) },
      { week: 3, title: 'Deep Dive into React', topics: toTopics(['Components, Props & State', 'React Hooks (useState, useEffect)', 'React Router for SPAs', 'State Management with Context API']) },
      { week: 4, title: 'Backend Development with Node.js & Express', topics: toTopics(['Building RESTful APIs', 'Middleware & Routing', 'Asynchronous JavaScript (Async/Await)', 'Connecting to Databases']) },
      { week: 5, title: 'Database Management with MongoDB', topics: toTopics(['NoSQL Concepts', 'CRUD Operations with Mongoose', 'Data Modeling & Schemas', 'Database Indexing & Aggregation']) },
      { week: 6, title: 'Full Stack Integration & Authentication', topics: toTopics(['Connecting React Frontend to Express Backend', 'JWT-based Authentication', 'Password Hashing', 'Protected Routes']) },
      { week: 7, title: 'Advanced Topics & Deployment', topics: toTopics(['WebSockets for Real-time Apps', 'Testing (Unit & Integration)', 'Deployment to Vercel/Heroku', 'CI/CD Basics']) },
      { week: 8, title: 'Capstone Project', topics: toTopics(['Project Planning & Architecture', 'Building a Full-Fledged MERN App', 'Code Reviews & Refactoring', 'Final Presentation']) }
    ],
    projects: [
      { title: 'E-commerce Platform', description: 'Build a complete e-commerce site with product listings, a shopping cart, user authentication, and an admin panel for product management.', imageUrl: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop' },
      { title: 'Real-time Chat Application', description: 'Develop a chat application using WebSockets, allowing multiple users to communicate in real-time in different chat rooms.', imageUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2070&auto=format&fit=crop' },
    ],
    faqs: [
      {
        question: "Is this course suitable for beginners?",
        answer: "Absolutely! This course starts from the very basics of web development and requires no prior coding experience. We guide you step-by-step to become a proficient developer."
      },
      {
        question: "What kind of placement support can I expect?",
        answer: "We provide comprehensive placement support including resume building, mock interviews, and access to our network of over 300 hiring partners to help you land your dream job."
      }
    ],
    deadlines: [
      { date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), task: 'Submit Project 1: Portfolio Website' },
      { date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), task: 'Mid-term Quiz' },
      { date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), task: 'Submit Final Capstone Project' },
    ]
  },
  {
    name: 'Data Engineering',
    slug: 'data-engineering',
    tagline: 'Build and manage the data pipelines that power modern enterprises.',
    description: 'In the age of big data, Data Engineers are essential. This program covers the A-Z of designing, building, and maintaining robust data infrastructures. You will learn to work with technologies like Spark, Hadoop, and Kafka, and master ETL processes to transform raw data into actionable insights. This program is perfect for those who love working with data and building scalable systems.',
    points: ['Big Data Technologies', 'Live Industry Case Studies', 'Expert-led Training'],
    category: 'Data Science',
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6e74e3cce2?q=80&w=2070&auto=format&fit=crop',
    duration: '8 Weeks Intensive Program',
    highlights: ['Process Terabytes of Data', 'Master ETL/ELT Pipelines', 'Live Industry Case Studies', 'Cloud Data Platform Expertise'],
     learningObjectives: [
      'Design and implement scalable data ingestion frameworks.',
      'Master distributed data processing with Apache Spark.',
      'Build and manage data warehouses and data lakes.',
      'Automate data pipelines using tools like Airflow.',
      'Understand data governance, quality, and security best practices.'
    ],
    instructor: {
      name: 'Rahul Verma',
      title: 'Lead Data Architect @ DataSolutions',
      imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop',
      bio: 'Rahul has architected data solutions for Fortune 500 companies, specializing in big data analytics and cloud infrastructure. He brings a wealth of practical knowledge to the classroom.',
    },
    pricing: {
      amount: 85000,
      currency: 'INR',
      note: 'EMI options available starting at ₹7,083/month.',
      inclusions: ['Lifetime access to course materials', 'Dedicated placement support', 'Certificate of Completion', 'Cloud credits for projects']
    },
    curriculum: [
        { week: 1, title: 'Data Engineering Fundamentals & Python', topics: toTopics(['Introduction to Data Engineering', 'Advanced Python for Data', 'SQL for Data Analysis', 'Data Modeling Concepts']) },
        { week: 2, title: 'Data Warehousing & Data Lakes', topics: toTopics(['ETL vs ELT', 'Dimensional Modeling', 'Introduction to Big Data & Hadoop', 'Working with HDFS']) },
        { week: 3, title: 'Distributed Computing with Spark', topics: toTopics(['Spark Architecture & RDDs', 'DataFrames & Spark SQL', 'Spark Streaming for Real-time Data', 'Performance Tuning in Spark']) },
        { week: 4, title: 'Data Orchestration & Workflow Automation', topics: toTopics(['Introduction to Apache Airflow', 'Building DAGs', 'Scheduling & Monitoring Pipelines', 'Best Practices for Workflow Management']) },
        { week: 5, title: 'Messaging Systems with Kafka', topics: toTopics(['Kafka Fundamentals', 'Producers, Consumers & Brokers', 'Building a Real-time Data Pipeline', 'Kafka Connect & Schema Registry']) },
        { week: 6, title: 'Cloud Data Engineering on AWS', topics: toTopics(['Introduction to AWS Data Services (S3, Glue, Redshift)', 'Building a Data Lake on S3', 'Serverless ETL with AWS Lambda', 'Using Amazon Athena for Queries']) },
        { week: 7, title: 'Data Governance and Security', topics: toTopics(['Data Quality Frameworks', 'Data Lineage & Catalogs', 'Security Best Practices', 'Compliance (GDPR, etc.)']) },
        { week: 8, title: 'Capstone Project: End-to-End Data Pipeline', topics: toTopics(['Architecting a Scalable Pipeline', 'Ingesting, Processing & Storing Data', 'Creating Dashboards for Insights', 'Project Demonstration']) }
    ],
    projects: [
        { title: 'Real-Time Analytics Dashboard', description: 'Build an end-to-end pipeline that ingests streaming data using Kafka, processes it with Spark, and visualizes insights on a live dashboard.', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' },
        { title: 'Cloud Data Warehouse Solution', description: 'Design and implement a scalable data warehouse on AWS, using services like Glue for ETL and Redshift for analytics to answer business queries.', imageUrl: 'https://images.unsplash.com/photo-1633493717311-b1e3e4cf3220?q=80&w=2070&auto=format&fit=crop' },
    ],
    faqs: [],
    deadlines: [
      { date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), task: 'Data Modeling Assignment' },
      { date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), task: 'Spark Mini-Project Submission' },
    ]
  },
  {
    name: 'DevOps',
    slug: 'devops',
    tagline: 'Automate infrastructure and streamline the software development lifecycle.',
    description: 'Bridge the gap between development and operations. Our DevOps program teaches you the culture, tools, and practices needed to increase an organization\'s ability to deliver applications and services at high velocity. You\'ll gain hands-on experience with CI/CD pipelines, containerization with Docker and Kubernetes, and infrastructure-as-code using Terraform.',
    points: ['CI/CD Pipeline Mastery', 'Cloud Platform Integration', 'Guaranteed Certification'],
    category: 'Cloud & DevOps',
    imageUrl: 'https://images.unsplash.com/photo-1544890225-2fde0e66ea9c?q=80&w=1932&auto=format&fit=crop',
    duration: '8 Weeks Intensive Program',
    highlights: ['Master CI/CD Pipelines', 'Containerization with Docker & Kubernetes', 'Infrastructure as Code (IaC)', 'Real-time Monitoring & Logging'],
    learningObjectives: [
      'Automate build, test, and deployment processes with Jenkins.',
      'Containerize applications using Docker.',
      'Orchestrate containers at scale with Kubernetes.',
      'Manage cloud infrastructure programmatically using Terraform.',
      'Implement monitoring and logging solutions with Prometheus and Grafana.'
    ],
    instructor: {
      name: 'Anjali Desai',
      title: 'Principal DevOps Engineer @ Cloudify',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
      bio: 'Anjali is a certified Kubernetes administrator and a DevOps evangelist with a passion for automation. She has helped numerous organizations transition to a modern, agile DevOps culture.',
    },
    pricing: {
      amount: 80000,
      currency: 'INR',
      note: 'EMI options available starting at ₹6,667/month.',
      inclusions: ['Lifetime access to course materials', 'Dedicated placement support', 'Certificate of Completion', 'Exam preparation for CKA']
    },
    curriculum: [
        { week: 1, title: 'Introduction to DevOps & Linux Basics', topics: toTopics(['DevOps Principles (CAMS)', 'Shell Scripting', 'Linux Command Line', 'Networking Fundamentals']) },
        { week: 2, title: 'Version Control & CI with Git and Jenkins', topics: toTopics(['Git Fundamentals', 'Branching Strategies', 'Setting up Jenkins', 'Building Automated CI Pipelines']) },
        { week: 3, title: 'Containerization with Docker', topics: toTopics(['Docker Architecture', 'Writing Dockerfiles', 'Docker Compose for Multi-container Apps', 'Managing Images with Docker Hub']) },
        { week: 4, title: 'Container Orchestration with Kubernetes', topics: toTopics(['Kubernetes Core Concepts (Pods, Services, Deployments)', 'Managing State with Volumes', 'Networking in Kubernetes', 'Using Helm Charts']) },
        { week: 5, title: 'Infrastructure as Code (IaC) with Terraform', topics: toTopics(['IaC Principles', 'Writing Terraform Configurations', 'Managing AWS/GCP Resources', 'Terraform Modules & State Management']) },
        { week: 6, title: 'Configuration Management with Ansible', topics: toTopics(['Ansible Architecture', 'Writing Playbooks', 'Managing Multiple Servers', 'Roles & Best Practices']) },
        { week: 7, title: 'Monitoring & Logging', topics: toTopics(['Prometheus for Monitoring', 'Grafana for Visualization', 'Setting up the ELK Stack (Elasticsearch, Logstash, Kibana)', 'Alerting & SLOs']) },
        { week: 8, title: 'Capstone Project: Fully Automated Application Deployment', topics: toTopics(['Designing a CI/CD workflow for a microservice app', 'Provisioning infrastructure with Terraform', 'Deploying to Kubernetes', 'Implementing monitoring']) }
    ],
    projects: [
        { title: 'Automated CI/CD Pipeline for a Web App', description: 'Create a complete pipeline that automatically builds, tests, and deploys a web application to a Kubernetes cluster on every code commit.', imageUrl: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2106&auto=format&fit=crop' },
        { title: 'Scalable Cloud Infrastructure with Terraform', description: 'Write Terraform code to provision a secure, scalable, and resilient cloud infrastructure on AWS or GCP to host a production-grade application.', imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop' },
    ],
    faqs: [],
    deadlines: [
      { date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(), task: 'Jenkins Pipeline Setup' },
      { date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(), 'task': 'Kubernetes Deployment Task' },
    ]
  },
  {
    name: 'AI/ML',
    slug: 'ai-ml',
    tagline: 'Unlock the power of data with machine learning and artificial intelligence.',
    description: 'Step into the future with our Artificial Intelligence and Machine Learning program. This course provides a deep dive into the theoretical foundations and practical applications of ML. You will learn to build and train models for tasks like classification, regression, and natural language processing, using Python libraries such as TensorFlow and PyTorch. Get ready to solve complex problems and drive innovation.',
    points: ['Advanced Algorithms', 'Practical Application', 'Career Support'],
    category: 'AI & ML',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-2858200f7426?q=80&w=2156&auto=format&fit=crop',
    duration: '8 Weeks Intensive Program',
    highlights: ['Train Advanced Neural Networks', 'Practical, Real-World Datasets', 'Master TensorFlow & PyTorch', 'Specialized Career Tracks'],
    learningObjectives: [
      'Understand the mathematical foundations of machine learning algorithms.',
      'Implement supervised and unsupervised learning models from scratch.',
      'Build and train deep neural networks for computer vision and NLP.',
      'Master popular ML libraries like Scikit-learn, TensorFlow, and PyTorch.',
      'Deploy machine learning models into production environments.'
    ],
    instructor: {
      name: 'Vikram Singh',
      title: 'Machine Learning Scientist @ InnovateAI',
      imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop',
      bio: 'Vikram holds a Ph.D. in Computer Science and has published several papers on novel machine learning algorithms. He specializes in applying AI to solve real-world business problems.',
    },
    pricing: {
      amount: 90000,
      currency: 'INR',
      note: 'EMI options available starting at ₹7,500/month.',
      inclusions: ['Lifetime access to course materials', 'Dedicated placement support', 'Certificate of Completion', 'GPU usage for projects']
    },
    curriculum: [
        { week: 1, title: 'Python for ML & Data Science Foundations', topics: toTopics(['NumPy for Numerical Computing', 'Pandas for Data Manipulation', 'Data Visualization with Matplotlib & Seaborn', 'Linear Algebra & Probability Basics']) },
        { week: 2, title: 'Supervised Learning', topics: toTopics(['Linear & Logistic Regression', 'Decision Trees & Random Forests', 'Support Vector Machines (SVM)', 'Model Evaluation Metrics']) },
        { week: 3, title: 'Unsupervised Learning & Feature Engineering', topics: toTopics(['K-Means Clustering', 'Principal Component Analysis (PCA)', 'Feature Scaling & Selection', 'Handling Missing Data']) },
        { week: 4, title: 'Introduction to Deep Learning & Neural Networks', topics: toTopics(['What are Neural Networks?', 'Building a Neural Network with TensorFlow/Keras', 'Activation Functions & Optimizers', 'Backpropagation Explained']) },
        { week: 5, title: 'Computer Vision with CNNs', topics: toTopics(['Convolutional Neural Networks (CNNs)', 'Image Classification Projects', 'Transfer Learning with Pre-trained Models', 'Object Detection Basics']) },
        { week: 6, title: 'Natural Language Processing (NLP)', topics: toTopics(['Text Preprocessing', 'Word Embeddings (Word2Vec, GloVe)', 'Recurrent Neural Networks (RNNs) & LSTMs', 'Building a Sentiment Analysis Model']) },
        { week: 7, title: 'Advanced Topics & MLOps', topics: toTopics(['Introduction to Transformers (BERT)', 'Model Deployment with Flask/FastAPI', 'Containerizing ML Models with Docker', 'Experiment Tracking with MLflow']) },
        { week: 8, title: 'Capstone Project: End-to-End ML Application', topics: toTopics(['Problem Formulation & Data Collection', 'Model Training & Tuning', 'Building an API for the Model', 'Creating a User Interface']) }
    ],
    projects: [
        { title: 'Image Classifier for Medical Diagnosis', description: 'Train a deep learning model to classify medical images (e.g., X-rays) to detect certain conditions, achieving high accuracy using transfer learning.', imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop' },
        { title: 'Sentiment Analysis of Customer Reviews', description: 'Build an NLP model to analyze a large dataset of customer reviews and classify them as positive, negative, or neutral to derive business insights.', imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e2775df?q=80&w=2070&auto=format&fit=crop' },
    ],
    faqs: [],
    deadlines: [
      { date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(), task: 'Submit NLP Model' },
      { date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(), task: 'Final Project Presentation' },
    ]
  },
  {
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    tagline: 'Become a certified defender of the digital world.',
    description: 'This program provides comprehensive training in cybersecurity principles, tools, and best practices. You will learn to identify vulnerabilities, detect and respond to incidents, and secure networks and systems against cyber threats. Gain hands-on experience in ethical hacking, risk management, and compliance.',
    points: ['Ethical Hacking', 'Network Security', 'Industry Certifications'],
    category: 'Cybersecurity',
    imageUrl: 'https://images.unsplash.com/photo-1544890269-92d887f3cca7?q=80&w=2070&auto=format&fit=crop',
    duration: '10 Weeks Intensive Program',
    highlights: ['Prepare for CompTIA Security+', 'Hands-on Cyber Labs', 'Incident Response Drills', 'Expert-led Training'],
    learningObjectives: [
      'Understand core cybersecurity concepts, threats, and vulnerabilities.',
      'Implement network security controls and protocols.',
      'Conduct penetration testing and vulnerability assessments.',
      'Analyze and respond to security incidents.',
      'Learn about compliance frameworks like GDPR and ISO 27001.'
    ],
    instructor: {
      name: 'Ravi Kumar',
      title: 'Certified Ethical Hacker (CEH)',
      imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop',
      bio: 'Ravi is a cybersecurity expert with over a decade of experience in protecting corporate networks. He is passionate about teaching the next generation of cyber defenders.',
    },
    pricing: {
      amount: 95000,
      currency: 'INR',
      note: 'EMI options available starting at ₹7,917/month.',
      inclusions: ['Exam vouchers for certifications', 'Lifetime access to course materials', 'Dedicated placement support', 'Virtual lab access']
    },
    curriculum: [
      { week: 1, title: 'Introduction to Cybersecurity', topics: toTopics(['Threats and Attacks', 'Security Principles', 'Networking Fundamentals']) },
      { week: 2, title: 'Network Security', topics: toTopics(['Firewalls and VPNs', 'Intrusion Detection Systems', 'Wireless Network Security']) },
      { week: 3, title: 'Ethical Hacking', topics: toTopics(['Reconnaissance', 'Scanning Networks', 'Gaining Access', 'Maintaining Access']) },
      { week: 4, title: 'Web Application Security', topics: toTopics(['OWASP Top 10', 'SQL Injection', 'Cross-Site Scripting (XSS)']) },
      { week: 5, title: 'Cryptography', topics: toTopics(['Symmetric and Asymmetric Encryption', 'Public Key Infrastructure (PKI)', 'Hashing Algorithms']) },
      { week: 6, title: 'Incident Response', topics: toTopics(['Detection and Analysis', 'Containment and Eradication', 'Post-Incident Recovery']) },
      { week: 7, title: 'Cloud Security', topics: toTopics(['Securing AWS and Azure', 'Container Security', 'Serverless Security']) },
      { week: 8, title: 'Compliance and Auditing', topics: toTopics(['ISO 27001', 'GDPR', 'Security Audits']) },
      { week: 9, title: 'Advanced Topics', topics: toTopics(['Malware Analysis', 'Forensics', 'Threat Intelligence']) },
      { week: 10, title: 'Capstone Project and Certification Prep', topics: toTopics(['Live Security Assessment', 'CompTIA Security+ Exam Prep']) }
    ],
    projects: [
      { title: 'Corporate Network Security Audit', description: 'Perform a full security audit on a simulated corporate network, identify vulnerabilities, and present a mitigation report.', imageUrl: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2070&auto=format&fit=crop' },
      { title: 'Live Incident Response Simulation', description: 'Participate in a team-based drill to respond to a live, simulated cyber-attack, from detection to resolution.', imageUrl: 'https://images.unsplash.com/photo-1585144860135-ea5741334200?q=80&w=2070&auto=format&fit=crop' },
    ],
    faqs: [],
    deadlines: []
  },
  {
    name: 'Cloud Computing',
    slug: 'cloud-computing',
    tagline: 'Master the cloud with AWS and Azure expertise.',
    description: 'This program is designed to make you a proficient cloud professional. You will gain deep knowledge of core cloud services for compute, storage, networking, and databases. The curriculum covers both AWS and Azure, preparing you for top certifications and high-demand cloud roles.',
    points: ['AWS & Azure Training', 'Hands-on Labs', 'Certification Focused'],
    category: 'Cloud & DevOps',
    imageUrl: 'https://images.unsplash.com/photo-1590903341499-c2b6a5a083a3?q=80&w=2070&auto=format&fit=crop',
    duration: '10 Weeks Intensive Program',
    highlights: ['Dual Platform Expertise', 'Infrastructure as Code', 'Serverless Architecture', 'Prepare for AWS/Azure Certification'],
    learningObjectives: [
      'Design and deploy scalable, highly available, and fault-tolerant systems on AWS and Azure.',
      'Manage cloud infrastructure using Terraform and CloudFormation.',
      'Build serverless applications using AWS Lambda and Azure Functions.',
      'Implement cloud security best practices.',
      'Understand cloud cost management and optimization.'
    ],
    instructor: {
      name: 'Meera Iyer',
      title: 'Cloud Solutions Architect',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
      bio: 'Meera is a certified AWS and Azure architect with extensive experience in migrating and managing enterprise workloads in the cloud. She loves simplifying complex cloud concepts.',
    },
    pricing: {
      amount: 88000,
      currency: 'INR',
      note: 'EMI options available starting at ₹7,333/month.',
      inclusions: ['Cloud platform credits', 'Certification exam vouchers', 'Lifetime access to materials', 'Dedicated placement support']
    },
    curriculum: [
      { week: 1, title: 'Cloud Fundamentals', topics: toTopics(['Cloud Computing Models', 'Global Infrastructure', 'Core Services Overview']) },
      { week: 2, title: 'AWS Core Services', topics: toTopics(['EC2, S3, VPC', 'IAM', 'RDS']) },
      { week: 3, title: 'Azure Core Services', topics: toTopics(['Virtual Machines, Blob Storage', 'Virtual Networks', 'Azure AD']) },
      { week: 4, title: 'Infrastructure as Code', topics: toTopics(['Terraform Basics', 'Managing AWS with Terraform', 'Managing Azure with Terraform']) },
      { week: 5, title: 'Serverless Computing', topics: toTopics(['AWS Lambda', 'API Gateway', 'Azure Functions']) },
      { week: 6, title: 'Cloud Native & Containers', topics: toTopics(['Docker on the Cloud', 'Amazon EKS', 'Azure Kubernetes Service (AKS)']) },
      { week: 7, title: 'Cloud Security', topics: toTopics(['Identity and Access Management', 'Network Security Groups', 'Data Encryption']) },
      { week: 8, title: 'Cloud Monitoring & Management', topics: toTopics(['AWS CloudWatch', 'Azure Monitor', 'Cost Management']) },
      { week: 9, title: 'Migration & Advanced Architectures', topics: toTopics(['Cloud Migration Strategies', 'Well-Architected Framework', 'High Availability and Disaster Recovery']) },
      { week: 10, title: 'Capstone Project & Certification Prep', topics: toTopics(['Deploying a 3-tier application', 'AWS/Azure Certification Exam Prep']) }
    ],
    projects: [
      { title: 'Deploy a Scalable Web Application', description: 'Deploy a multi-tier, scalable, and highly available web application on both AWS and Azure using infrastructure as code.', imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop' },
      { title: 'Serverless Data Processing Pipeline', description: 'Build a serverless pipeline that processes uploaded images to create thumbnails using Lambda or Azure Functions.', imageUrl: 'https://images.unsplash.com/photo-1633493717311-b1e3e4cf3220?q=80&w=2070&auto=format&fit=crop' },
    ],
    faqs: [],
    deadlines: []
  },
  {
    name: 'UI/UX Design',
    slug: 'ui-ux-design',
    tagline: 'Craft beautiful and user-centric digital experiences.',
    description: 'This course covers the entire UI/UX design process, from user research and wireframing to prototyping and usability testing. You will learn design principles, master tools like Figma, and build a portfolio of projects that showcase your ability to create intuitive and engaging digital products.',
    points: ['User Research', 'Prototyping in Figma', 'Portfolio Building'],
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1611263297333-4a13340003ce?q=80&w=2070&auto=format&fit=crop',
    duration: '8 Weeks Intensive Program',
    highlights: ['Master Figma from Scratch', 'Build a Professional Portfolio', 'Real-world Case Studies', 'End-to-end Design Process'],
    learningObjectives: [
      'Conduct user research and create user personas.',
      'Design wireframes, mockups, and interactive prototypes.',
      'Understand principles of visual design, typography, and color theory.',
      'Master design tools like Figma.',
      'Perform usability testing and iterate on designs.'
    ],
    instructor: {
      name: 'Aisha Khan',
      title: 'Senior Product Designer @ CreativeCo',
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop',
      bio: 'Aisha is a passionate designer with a knack for creating user-friendly interfaces. She has worked on apps used by millions and loves mentoring new designers.',
    },
    pricing: {
      amount: 70000,
      currency: 'INR',
      note: 'EMI options available starting at ₹5,833/month.',
      inclusions: ['Figma Pro access for course duration', 'Portfolio review sessions', 'Lifetime access to materials', 'Dedicated placement support']
    },
    curriculum: [
      { week: 1, title: 'Foundations of UX Design', topics: toTopics(['Design Thinking', 'User Research Methods', 'Personas and Journey Mapping']) },
      { week: 2, title: 'Information Architecture & Wireframing', topics: toTopics(['Sitemaps and User Flows', 'Low-fidelity Wireframing', 'Prototyping Basics']) },
      { week: 3, title: 'UI Design Principles', topics: toTopics(['Visual Hierarchy', 'Color Theory', 'Typography', 'Grid Systems']) },
      { week: 4, title: 'Mastering Figma', topics: toTopics(['Interface and Tools', 'Components and Auto Layout', 'Interactive Prototyping']) },
      { week: 5, title: 'Designing for Web', topics: toTopics(['Responsive Design', 'Landing Page Design', 'Forms and UI Elements']) },
      { week: 6, title: 'Designing for Mobile', topics: toTopics(['iOS vs. Android Guidelines', 'Mobile-First Design', 'Gestures and Interactions']) },
      { week: 7, title: 'Usability Testing', topics: toTopics(['Planning and Conducting Tests', 'Analyzing Feedback', 'Iterating on Designs']) },
      { week: 8, title: 'Portfolio & Career Prep', topics: toTopics(['Building a Case Study', 'Portfolio Website Design', 'Interview Preparation']) }
    ],
    projects: [
      { title: 'Mobile App for a Local Business', description: 'Design a complete mobile application for a local business, from user research and wireframes to a high-fidelity interactive prototype.', imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop' },
      { title: 'Website Redesign Case Study', description: 'Choose an existing website, identify its usability issues, and design a complete redesign, documenting your process in a professional case study.', imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop' },
    ],
    faqs: [],
    deadlines: []
  },
  {
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    tagline: 'Drive growth with data-driven marketing strategies.',
    description: 'This comprehensive program covers all key aspects of digital marketing, including SEO, SEM, social media marketing, content marketing, and analytics. You will learn to create and execute effective campaigns that drive traffic, generate leads, and increase sales. The course is hands-on, with live projects and case studies.',
    points: ['SEO & SEM', 'Social Media Strategy', 'Google Analytics'],
    category: 'Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    duration: '8 Weeks Intensive Program',
    highlights: ['Manage Live Ad Campaigns', 'Master Google Analytics', 'Content & SEO Strategy', 'Prepare for Google Ads Certification'],
    learningObjectives: [
      'Develop and implement a comprehensive digital marketing strategy.',
      'Optimize websites for search engines (SEO).',
      'Manage paid advertising campaigns on Google and social media.',
      'Create engaging content and manage social media presence.',
      'Analyze campaign performance using Google Analytics.'
    ],
    instructor: {
      name: 'Sameer Patel',
      title: 'Digital Marketing Manager @ Growthify',
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop',
      bio: 'Sameer is a results-driven marketer with a proven track record of scaling businesses through digital channels. He is an expert in performance marketing and analytics.',
    },
    pricing: {
      amount: 65000,
      currency: 'INR',
      note: 'EMI options available starting at ₹5,417/month.',
      inclusions: ['Live ad budget for projects', 'Certification exam prep', 'Lifetime access to materials', 'Dedicated placement support']
    },
    curriculum: [
      { week: 1, title: 'Digital Marketing Fundamentals', topics: toTopics(['Marketing Funnel', 'Customer Personas', 'Strategy Frameworks']) },
      { week: 2, title: 'Search Engine Optimization (SEO)', topics: toTopics(['Keyword Research', 'On-Page and Off-Page SEO', 'Technical SEO']) },
      { week: 3, title: 'Search Engine Marketing (SEM)', topics: toTopics(['Google Ads', 'Campaign Structure', 'Bid Strategies', 'Ad Copywriting']) },
      { week: 4, title: 'Social Media Marketing', topics: toTopics(['Platform Strategies (Facebook, Instagram, LinkedIn)', 'Content Creation', 'Community Management']) },
      { week: 5, title: 'Content Marketing', topics: toTopics(['Content Strategy', 'Blogging and Copywriting', 'Email Marketing']) },
      { week: 6, title: 'Web Analytics', topics: toTopics(['Google Analytics', 'Tracking and Measurement', 'Reporting and Dashboards']) },
      { week: 7, title: 'Advanced Topics', topics: toTopics(['Conversion Rate Optimization (CRO)', 'Influencer Marketing', 'Affiliate Marketing']) },
      { week: 8, title: 'Capstone Project & Certification', topics: toTopics(['Developing an Integrated Campaign', 'Budgeting and ROI Analysis', 'Google Ads Certification Prep']) }
    ],
    projects: [
      { title: 'Launch a Google Ads Campaign', description: 'Plan, create, and manage a live Google Ads campaign for a product or service with a real budget, optimizing it for conversions.', imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop' },
      { title: 'Develop a Content & SEO Strategy', description: 'Create a comprehensive content and SEO strategy for a website, including keyword research, a content calendar, and backlink-building ideas.', imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop' },
    ],
    faqs: [],
    deadlines: []
  },
];

export const courseCategories = ['All', 'Web Development', 'Data Science', 'Cloud & DevOps', 'AI & ML', 'Cybersecurity', 'Design', 'Marketing'];

export const partners: Partner[] = [
  { 
    name: 'TCS', 
    slug: 'tcs',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg', 
    websiteUrl: 'https://www.tcs.com/careers', 
    description: 'A global leader in IT services, consulting, and business solutions.',
    bannerImageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4be3?q=80&w=2070&auto=format&fit=crop',
    longDescription: 'Tata Consultancy Services (TCS) is an IT services, consulting and business solutions organization that has been partnering with many of the world’s largest businesses in their transformation journeys for over 50 years. As a key partner, TCS actively recruits from our talent pool for various next-gen technology roles.',
    hiringRoles: ['Full Stack Developer', 'Data Analyst', 'Cloud Engineer', 'DevOps Specialist', 'QA Automation Engineer'],
    contact: { email: 'careers@tcs.com', phone: '+91-22-6778-9595' }
  },
  { 
    name: 'Infosys', 
    slug: 'infosys',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg', 
    websiteUrl: 'https://www.infosys.com/careers/', 
    description: 'A global leader in next-generation digital services and consulting.',
    bannerImageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4b248a?q=80&w=1974&auto=format&fit=crop',
    longDescription: 'Infosys is a global leader in next-generation digital services and consulting. We enable clients in more than 50 countries to navigate their digital transformation. Our partnership with SED provides a direct pipeline for skilled graduates to join our innovative teams and work on cutting-edge projects.',
    hiringRoles: ['Systems Engineer', 'Technology Analyst', 'Digital Specialist Engineer', 'Java Developer', 'Salesforce Developer'],
    contact: { email: 'recruitment@infosys.com', phone: '+91-80-2852-0261' }
  },
  { 
    name: 'Wipro', 
    slug: 'wipro',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg', 
    websiteUrl: 'https://careers.wipro.com/', 
    description: 'A leading technology services and consulting company focused on building innovative solutions.',
    bannerImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    longDescription: "Wipro Limited is a leading technology services and consulting company focused on building innovative solutions that address clients' most complex digital transformation needs. We value the practical, hands-on training that SED graduates receive and actively seek them for roles across our global operations.",
    hiringRoles: ['Project Engineer', 'Software Developer', 'Cybersecurity Analyst', 'Business Analyst', 'Network Administrator'],
    contact: { email: 'talent.acquisition@wipro.com', phone: '+91-80-2844-0011' }
  },
  { 
    name: 'HCL', 
    slug: 'hcl',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/HCLTech_logo_SVG.svg', 
    websiteUrl: 'https://www.hcltech.com/careers', 
    description: 'A next-generation global technology company that helps enterprises reimagine their businesses.',
    bannerImageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    longDescription: 'HCLTech is a global technology company, home to 225,900+ people across 60 countries, delivering industry-leading capabilities centered around digital, engineering and cloud. Our partnership ensures SED students have access to opportunities in a dynamic and fast-growing global enterprise.',
    hiringRoles: ['Software Engineer', 'Test Engineer', 'Infrastructure Engineer', 'Analytics Specialist', 'Product Support Engineer'],
    contact: { email: 'careers.hcl@hcl.com', phone: '+91-120-252-0917' }
  },
  { 
    name: 'Accenture', 
    slug: 'accenture',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg', 
    websiteUrl: 'https://www.accenture.com/in-en/careers', 
    description: 'A global professional services company with leading capabilities in digital, cloud and security.',
    bannerImageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
    longDescription: "Accenture is a global professional services company with leading capabilities in digital, cloud and security. Combining unmatched experience and specialized skills across more than 40 industries, we offer Strategy and Consulting, Interactive, Technology and Operations services. We are proud to partner with SED to find the next generation of tech talent.",
    hiringRoles: ['Application Development Associate', 'Cloud Migration & Implementation Associate', 'Security Associate', 'Data Engineering Associate', 'Business and Integration Arch Associate'],
    contact: { email: 'india.careers@accenture.com', phone: '+91-80-4106-0000' }
  },
  { 
    name: 'Cognizant', 
    slug: 'cognizant',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Cognizant_logo_2022.svg', 
    websiteUrl: 'https://careers.cognizant.com/global/en', 
    description: 'An American multinational technology company that provides business consulting and IT services.',
    bannerImageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
    longDescription: "Cognizant engineers modern businesses. We help our clients modernize technology, reimagine processes and transform experiences so they can stay ahead in a fast-changing world. Our collaboration with SED helps us identify and nurture skilled individuals who are ready to make an impact.",
    hiringRoles: ['Programmer Analyst Trainee', 'Graduate Trainee', 'Associate - Projects', 'Cloud Practitioner', 'Data Scientist'],
    contact: { email: 'campus.recruitment@cognizant.com', phone: '+91-44-4209-6000' }
  },
  { 
    name: 'Capgemini', 
    slug: 'capgemini',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Capgemini_201x_logo.svg', 
    websiteUrl: 'https://www.capgemini.com/in-en/careers/', 
    description: 'A global leader in partnering with companies to transform and manage their business.',
    bannerImageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop',
    longDescription: 'Capgemini is a global leader in partnering with companies to transform and manage their business by harnessing the power of technology. The Group is guided everyday by its purpose of unleashing human energy through technology for an inclusive and sustainable future. We frequently hire SED graduates for their strong technical foundation and problem-solving abilities.',
    hiringRoles: ['Software Engineer', 'Consultant', 'Technology Analyst', 'Data & Analytics Consultant', 'Cloud Infrastructure Services'],
    contact: { email: 'freshers.careers@capgemini.com', phone: '+91-80-6656-7000' }
  },
  { 
    name: 'Tech Mahindra',
    slug: 'tech-mahindra', 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Tech_Mahindra_New_Logo.svg', 
    websiteUrl: 'https://careers.techmahindra.com/', 
    description: 'Represents the connected world, offering innovative and customer-centric IT experiences.',
    bannerImageUrl: 'https://images.unsplash.com/photo-1610986603197-f739c9f02174?q=80&w=2070&auto=format&fit=crop',
    longDescription: 'Tech Mahindra represents the connected world, offering innovative and customer-centric information technology experiences, enabling Enterprises, Associates and the Society to Rise™. We are a USD 6.5 billion company with 148,000+ professionals across 90 countries, helping 1250+ global customers including Fortune 500 companies. Our partnership with SED is vital to our talent strategy.',
    hiringRoles: ['Associate Software Engineer', 'Network Engineer', 'Security Analyst', 'Business Associate', 'Technical Support Engineer'],
    contact: { email: 'careers@techmahindra.com', phone: '+91-20-4225-0000' }
  },
];

export const teamMembers: TeamMember[] = [
    { name: 'KWAJA KARRIMMUDDIN SYED', title: 'Working Partner', imageUrl: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921&auto=format&fit=crop' },
    { name: 'MOHAMMED YUNUS KOONA', title: 'Working Partner', imageUrl: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=1887&auto=format&fit=crop' },
    { name: 'ANWAR UL HAQ SYED', title: 'Working Partner', imageUrl: 'https://images.unsplash.com/photo-1627161683084-e64e4a503859?q=80&w=1887&auto=format&fit=crop' },
    { name: 'REHMAN MUZIBUR SHAIK', title: 'Working Partner', imageUrl: 'https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?q=80&w=1887&auto=format&fit=crop' },
];

export const coreValues: CoreValue[] = [
    {
        title: 'Student-Centricity',
        description: 'Our students are at the core of everything we do. We are dedicated to their success and growth.',
        icon: 'StudentCentricityIcon',
    },
    {
        title: 'Innovation',
        description: 'We embrace change and continuously update our curriculum to stay ahead of industry trends.',
        icon: 'InnovationIcon',
    },
    {
        title: 'Excellence',
        description: 'We strive for the highest standards in teaching, mentorship, and placement support.',
        icon: 'ExcellenceIcon',
    },
    {
        title: 'Integrity',
        description: 'We operate with transparency and honesty, building a community of trust and respect.',
        icon: 'IntegrityIcon',
    }
];

export const testimonials: Testimonial[] = [
  {
    name: 'Priya Sharma',
    course: 'Full Stack Development',
    quote: 'The project-based curriculum was a game-changer. I built a real portfolio that impressed recruiters, and the placement support was incredible. I landed a job at a top startup within a month of graduating.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
  },
  {
    name: 'Rahul Verma',
    course: 'Data Engineering',
    quote: 'SED\'s instructors are industry experts who bring real-world scenarios into the classroom. The hands-on experience with Big Data technologies gave me the confidence to tackle complex challenges at my new job.',
    imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop',
  },
  {
    name: 'Anjali Desai',
    course: 'DevOps',
    quote: 'I transitioned my career from system administration to a high-paying DevOps role, thanks to this program. The focus on CI/CD and cloud platforms was exactly what the industry is looking for.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
  },
];

// FIX: Add and export faqs data for use in the FAQ component.
export const faqs: FAQ[] = [
  {
    question: 'What are the prerequisites for enrolling in a course?',
    answer: 'Most of our foundational courses, like Full Stack Development, do not require a prior coding background. We look for logical thinking and a strong desire to learn. For more advanced courses like AI/ML, some familiarity with programming concepts and mathematics is beneficial. Each course page has a detailed list of prerequisites.',
  },
  {
    question: 'Do you provide placement assistance?',
    answer: 'Absolutely. We offer dedicated placement support, which includes resume building, mock interviews, and connecting you with our extensive network of over 300 hiring partners. Our goal is to not just teach you the skills, but also to help you launch your career.',
  },
  {
    question: 'Are the classes online or offline?',
    answer: 'We offer flexible learning options to suit your needs. You can choose from fully online, traditional offline classroom sessions, or a hybrid model that combines the best of both worlds.',
  },
  {
    question: 'What is the duration of the courses?',
    answer: 'Course durations vary depending on the program\'s depth and intensity. Typically, our full-time bootcamps last between 4 to 6 months. We also offer part-time options. You can find specific duration details on each course page.',
  },
  {
    question: 'Do you offer any scholarships or EMI options?',
    answer: 'Yes, we believe that financial constraints should not be a barrier to quality education. We offer various scholarship programs for meritorious students and easy EMI options to make our programs more affordable. Please contact our admissions team for more details.',
  },
];

export const services: Service[] = [
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

// FIX: Add and export blogPosts data to be used by the blog context and components.
export const blogPosts: BlogPost[] = [
  {
    slug: 'why-full-stack-development-is-still-in-demand',
    title: 'Why Full Stack Development is Still in High Demand in 2024',
    content: 'Full stack development continues to be one of the most sought-after skills in the tech industry. In this post, we explore why companies are still eagerly hiring full stack developers and how our program can get you job-ready.\n\nThe ability to work on both the frontend and backend of an application makes you a versatile and valuable asset to any team. You can take a project from concept to completion, which is a huge advantage for startups and large corporations alike. Our Full Stack Development course covers the MERN stack, ensuring you learn the most relevant technologies.\n\nFrom building interactive user interfaces with React to creating robust server-side APIs with Node.js, our curriculum is designed to give you a comprehensive skill set. Enroll today and take the first step towards a rewarding career as a full-stack developer.',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
    category: 'Web Development',
    tags: ['full stack', 'web development', 'career', 'tech trends'],
    author: {
      name: 'Priya Sharma',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
    },
    publishedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    slug: 'demystifying-data-engineering-pipelines',
    title: 'Demystifying Data Engineering: Building Robust Pipelines',
    content: "Data is the new oil, but it's useless without the right infrastructure to process it. Data engineers are the architects of this infrastructure. This article breaks down what a data pipeline is, the key technologies involved like Spark and Kafka, and how our Data Engineering course provides hands-on experience building scalable systems.\n\nWe'll cover the differences between ETL and ELT, the importance of data warehousing, and how to orchestrate complex workflows using tools like Apache Airflow. Our program dives deep into these concepts, preparing you to tackle real-world data challenges.\n\nReady to build the backbone of modern data analytics? Join our Data Engineering program and become an indispensable part of the data revolution.",
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    category: 'Data Science',
    tags: ['data engineering', 'big data', 'etl', 'spark', 'kafka'],
    author: {
      name: 'Rahul Verma',
      imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop',
    },
    publishedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    slug: 'the-rise-of-devops-culture',
    title: 'More Than Just Tools: The Rise of DevOps Culture',
    content: "DevOps is more than just a set of tools; it's a cultural shift that breaks down silos between development and operations teams. Learn about the core principles of DevOps—collaboration, automation, and continuous improvement—and see how our program prepares you for the cultural and technical aspects of a modern DevOps role.\n\nWe focus on hands-on experience with CI/CD pipelines using Jenkins, containerization with Docker and Kubernetes, and infrastructure as code with Terraform. This holistic approach ensures you understand both the 'why' and the 'how' of DevOps.\n\nBy embracing a DevOps mindset, organizations can deliver better software faster. Our course will give you the skills to lead this transformation. ",
    imageUrl: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2106&auto=format&fit=crop',
    category: 'Cloud & DevOps',
    tags: ['devops', 'ci-cd', 'automation', 'cloud', 'culture'],
    author: {
      name: 'Anjali Desai',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    },
    publishedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
