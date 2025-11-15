// FIX: Import the FAQ type to be used for the new faqs constant.
import { Course, Partner, NavLink, Feature, TeamMember, CoreValue, Testimonial, FAQ } from './types';

export const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Program', href: '/programs' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/#contact' },
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
  },
  {
    name: 'Data Engineering',
    slug: 'data-engineering',
    tagline: 'Build and manage the data pipelines that power modern enterprises.',
    description: 'In the age of big data, Data Engineers are essential. This program covers the A-Z of designing, building, and maintaining robust data infrastructures. You will learn to work with technologies like Spark, Hadoop, and Kafka, and master ETL processes to transform raw data into actionable insights. This program is perfect for those who love working with data and building scalable systems.',
    points: ['Big Data Technologies', 'Live Industry Case Studies', 'Expert-led Training'],
    category: 'Data Science',
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6e74e3cce2?q=80&w=2070&auto=format&fit=crop',
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
  },
  {
    name: 'DevOps',
    slug: 'devops',
    tagline: 'Automate infrastructure and streamline the software development lifecycle.',
    description: 'Bridge the gap between development and operations. Our DevOps program teaches you the culture, tools, and practices needed to increase an organization\'s ability to deliver applications and services at high velocity. You\'ll gain hands-on experience with CI/CD pipelines, containerization with Docker and Kubernetes, and infrastructure-as-code using Terraform.',
    points: ['CI/CD Pipeline Mastery', 'Cloud Platform Integration', 'Guaranteed Certification'],
    category: 'Cloud & DevOps',
    imageUrl: 'https://images.unsplash.com/photo-1544890225-2fde0e66ea9c?q=80&w=1932&auto=format&fit=crop',
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
  },
  {
    name: 'AI/ML',
    slug: 'ai-ml',
    tagline: 'Unlock the power of data with machine learning and artificial intelligence.',
    description: 'Step into the future with our Artificial Intelligence and Machine Learning program. This course provides a deep dive into the theoretical foundations and practical applications of ML. You will learn to build and train models for tasks like classification, regression, and natural language processing, using Python libraries such as TensorFlow and PyTorch. Get ready to solve complex problems and drive innovation.',
    points: ['Advanced Algorithms', 'Practical Application', 'Career Support'],
    category: 'AI & ML',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-2858200f7426?q=80&w=2156&auto=format&fit=crop',
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
  },
];

export const courseCategories = ['All', 'Web Development', 'Data Science', 'Cloud & DevOps', 'AI & ML'];

export const partners: Partner[] = [
  { name: 'TCS', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg', websiteUrl: 'https://www.tcs.com' },
  { name: 'Infosys', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg', websiteUrl: 'https://www.infosys.com' },
  { name: 'Wipro', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg', websiteUrl: 'https://www.wipro.com' },
  { name: 'HCL', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/HCLTech_logo_SVG.svg', websiteUrl: 'https://www.hcltech.com' },
  { name: 'Accenture', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg', websiteUrl: 'https://www.accenture.com' },
  { name: 'Cognizant', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Cognizant_logo_2022.svg', websiteUrl: 'https://www.cognizant.com' },
  { name: 'Capgemini', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Capgemini_201x_logo.svg', websiteUrl: 'https://www.capgemini.com' },
  { name: 'Tech Mahindra', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Tech_Mahindra_New_Logo.svg', websiteUrl: 'https://www.techmahindra.com' },
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