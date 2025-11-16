// FIX: Import the FAQ type to be used for the new faqs constant.
import { Course, Partner, NavLink, Feature, TeamMember, CoreValue, Testimonial, FAQ, Service } from './types';

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
      { week: 1, title: 'Frontend Foundations: HTML, CSS & Git', topics: ['Semantic HTML5', 'Advanced CSS, Flexbox, Grid', 'Responsive Design', 'Version Control with Git & GitHub'] },
      { week: 2, title: 'JavaScript Fundamentals', topics: ['Data Types & Variables', 'Functions & Scope', 'DOM Manipulation', 'ES6+ Features (Arrow Functions, Promises)'] },
      { week: 3, title: 'Deep Dive into React', topics: ['Components, Props & State', 'React Hooks (useState, useEffect)', 'React Router for SPAs', 'State Management with Context API'] },
      { week: 4, title: 'Backend Development with Node.js & Express', topics: ['Building RESTful APIs', 'Middleware & Routing', 'Asynchronous JavaScript (Async/Await)', 'Connecting to Databases'] },
      { week: 5, title: 'Database Management with MongoDB', topics: ['NoSQL Concepts', 'CRUD Operations with Mongoose', 'Data Modeling & Schemas', 'Database Indexing & Aggregation'] },
      { week: 6, title: 'Full Stack Integration & Authentication', topics: ['Connecting React Frontend to Express Backend', 'JWT-based Authentication', 'Password Hashing', 'Protected Routes'] },
      { week: 7, title: 'Advanced Topics & Deployment', topics: ['WebSockets for Real-time Apps', 'Testing (Unit & Integration)', 'Deployment to Vercel/Heroku', 'CI/CD Basics'] },
      { week: 8, title: 'Capstone Project', topics: ['Project Planning & Architecture', 'Building a Full-Fledged MERN App', 'Code Reviews & Refactoring', 'Final Presentation'] }
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
        { week: 1, title: 'Data Engineering Fundamentals & Python', topics: ['Introduction to Data Engineering', 'Advanced Python for Data', 'SQL for Data Analysis', 'Data Modeling Concepts'] },
        { week: 2, title: 'Data Warehousing & Data Lakes', topics: ['ETL vs ELT', 'Dimensional Modeling', 'Introduction to Big Data & Hadoop', 'Working with HDFS'] },
        { week: 3, title: 'Distributed Computing with Spark', topics: ['Spark Architecture & RDDs', 'DataFrames & Spark SQL', 'Spark Streaming for Real-time Data', 'Performance Tuning in Spark'] },
        { week: 4, title: 'Data Orchestration & Workflow Automation', topics: ['Introduction to Apache Airflow', 'Building DAGs', 'Scheduling & Monitoring Pipelines', 'Best Practices for Workflow Management'] },
        { week: 5, title: 'Messaging Systems with Kafka', topics: ['Kafka Fundamentals', 'Producers, Consumers & Brokers', 'Building a Real-time Data Pipeline', 'Kafka Connect & Schema Registry'] },
        { week: 6, title: 'Cloud Data Engineering on AWS', topics: ['Introduction to AWS Data Services (S3, Glue, Redshift)', 'Building a Data Lake on S3', 'Serverless ETL with AWS Lambda', 'Using Amazon Athena for Queries'] },
        { week: 7, title: 'Data Governance and Security', topics: ['Data Quality Frameworks', 'Data Lineage & Catalogs', 'Security Best Practices', 'Compliance (GDPR, etc.)'] },
        { week: 8, title: 'Capstone Project: End-to-End Data Pipeline', topics: ['Architecting a Scalable Pipeline', 'Ingesting, Processing & Storing Data', 'Creating Dashboards for Insights', 'Project Demonstration'] }
    ],
    projects: [
        { title: 'Real-Time Analytics Dashboard', description: 'Build an end-to-end pipeline that ingests streaming data using Kafka, processes it with Spark, and visualizes insights on a live dashboard.', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' },
        { title: 'Cloud Data Warehouse Solution', description: 'Design and implement a scalable data warehouse on AWS, using services like Glue for ETL and Redshift for analytics to answer business queries.', imageUrl: 'https://images.unsplash.com/photo-1633493717311-b1e3e4cf3220?q=80&w=2070&auto=format&fit=crop' },
    ],
    faqs: []
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
        { week: 1, title: 'Introduction to DevOps & Linux Basics', topics: ['DevOps Principles (CAMS)', 'Shell Scripting', 'Linux Command Line', 'Networking Fundamentals'] },
        { week: 2, title: 'Version Control & CI with Git and Jenkins', topics: ['Git Fundamentals', 'Branching Strategies', 'Setting up Jenkins', 'Building Automated CI Pipelines'] },
        { week: 3, title: 'Containerization with Docker', topics: ['Docker Architecture', 'Writing Dockerfiles', 'Docker Compose for Multi-container Apps', 'Managing Images with Docker Hub'] },
        { week: 4, title: 'Container Orchestration with Kubernetes', topics: ['Kubernetes Core Concepts (Pods, Services, Deployments)', 'Managing State with Volumes', 'Networking in Kubernetes', 'Using Helm Charts'] },
        { week: 5, title: 'Infrastructure as Code (IaC) with Terraform', topics: ['IaC Principles', 'Writing Terraform Configurations', 'Managing AWS/GCP Resources', 'Terraform Modules & State Management'] },
        { week: 6, title: 'Configuration Management with Ansible', topics: ['Ansible Architecture', 'Writing Playbooks', 'Managing Multiple Servers', 'Roles & Best Practices'] },
        { week: 7, title: 'Monitoring & Logging', topics: ['Prometheus for Monitoring', 'Grafana for Visualization', 'Setting up the ELK Stack (Elasticsearch, Logstash, Kibana)', 'Alerting & SLOs'] },
        { week: 8, title: 'Capstone Project: Fully Automated Application Deployment', topics: ['Designing a CI/CD workflow for a microservice app', 'Provisioning infrastructure with Terraform', 'Deploying to Kubernetes', 'Implementing monitoring'] }
    ],
    projects: [
        { title: 'Automated CI/CD Pipeline for a Web App', description: 'Create a complete pipeline that automatically builds, tests, and deploys a web application to a Kubernetes cluster on every code commit.', imageUrl: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2106&auto=format&fit=crop' },
        { title: 'Scalable Cloud Infrastructure with Terraform', description: 'Write Terraform code to provision a secure, scalable, and resilient cloud infrastructure on AWS or GCP to host a production-grade application.', imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb121d15a?q=80&w=2070&auto=format&fit=crop' },
    ],
    faqs: []
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
        { week: 1, title: 'Python for ML & Data Science Foundations', topics: ['NumPy for Numerical Computing', 'Pandas for Data Manipulation', 'Data Visualization with Matplotlib & Seaborn', 'Linear Algebra & Probability Basics'] },
        { week: 2, title: 'Supervised Learning', topics: ['Linear & Logistic Regression', 'Decision Trees & Random Forests', 'Support Vector Machines (SVM)', 'Model Evaluation Metrics'] },
        { week: 3, title: 'Unsupervised Learning & Feature Engineering', topics: ['K-Means Clustering', 'Principal Component Analysis (PCA)', 'Feature Scaling & Selection', 'Handling Missing Data'] },
        { week: 4, title: 'Introduction to Deep Learning & Neural Networks', topics: ['What are Neural Networks?', 'Building a Neural Network with TensorFlow/Keras', 'Activation Functions & Optimizers', 'Backpropagation Explained'] },
        { week: 5, title: 'Computer Vision with CNNs', topics: ['Convolutional Neural Networks (CNNs)', 'Image Classification Projects', 'Transfer Learning with Pre-trained Models', 'Object Detection Basics'] },
        { week: 6, title: 'Natural Language Processing (NLP)', topics: ['Text Preprocessing', 'Word Embeddings (Word2Vec, GloVe)', 'Recurrent Neural Networks (RNNs) & LSTMs', 'Building a Sentiment Analysis Model'] },
        { week: 7, title: 'Advanced Topics & MLOps', topics: ['Introduction to Transformers (BERT)', 'Model Deployment with Flask/FastAPI', 'Containerizing ML Models with Docker', 'Experiment Tracking with MLflow'] },
        { week: 8, title: 'Capstone Project: End-to-End ML Application', topics: ['Problem Formulation & Data Collection', 'Model Training & Tuning', 'Building an API for the Model', 'Creating a User Interface'] }
    ],
    projects: [
        { title: 'Image Classifier for Medical Diagnosis', description: 'Train a deep learning model to classify medical images (e.g., X-rays) to detect certain conditions, achieving high accuracy using transfer learning.', imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop' },
        { title: 'Sentiment Analysis of Customer Reviews', description: 'Build an NLP model to analyze a large dataset of customer reviews and classify them as positive, negative, or neutral to derive business insights.', imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e2775df?q=80&w=2070&auto=format&fit=crop' },
    ],
    faqs: []
  },
];

export const courseCategories = ['All', 'Web Development', 'Data Science', 'Cloud & DevOps', 'AI & ML'];

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