require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');

const toTopics = (topics) => topics.map(t => ({
    title: t,
    videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    content: `Learn about **${t}** with hands-on practice and real-world applications.`
}));

const newCourses = [
    // AI & ML Courses
    {
        name: 'AI & ML with Python',
        slug: 'ai-ml-python',
        tagline: 'Algorithms + mini projects - start your AI journey.',
        description: 'Master machine learning algorithms and build intelligent applications with Python.',
        category: 'AI & ML',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
        duration: '10 Weeks',
        pricing: { amount: 65000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Python for ML', topics: toTopics(['NumPy', 'Pandas', 'Matplotlib']) },
            { week: 2, title: 'Supervised Learning', topics: toTopics(['Linear Regression', 'Classification']) }
        ]
    },
    {
        name: 'Deep Learning & Neural Networks',
        slug: 'deep-learning',
        tagline: 'CNNs, RNNs + TensorFlow - build advanced AI models.',
        description: 'Master deep learning with CNNs, RNNs, and TensorFlow for cutting-edge AI applications.',
        category: 'AI & ML',
        imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop',
        duration: '12 Weeks',
        pricing: { amount: 80000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Neural Networks', topics: toTopics(['Perceptrons', 'Backpropagation']) }
        ]
    },
    {
        name: 'Data Science & Analytics (Power BI / Tableau)',
        slug: 'data-science-analytics',
        tagline: 'Visualization + insights - turn data into decisions.',
        description: 'Master data analysis, visualization, and business intelligence with Power BI and Tableau.',
        category: 'Data Science',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        duration: '8 Weeks',
        pricing: { amount: 55000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Data Analysis', topics: toTopics(['Excel', 'SQL', 'Python']) }
        ]
    },
    {
        name: 'Generative AI & LLM Development',
        slug: 'generative-ai-llm',
        tagline: 'ChatGPT, LangChain, RAG - build next-gen AI apps.',
        description: 'Build cutting-edge AI applications with LLMs, LangChain, and RAG systems.',
        category: 'AI & ML',
        imageUrl: 'https://images.unsplash.com/photo-1676277791608-ac5c6e5f6d84?q=80&w=2071&auto=format&fit=crop',
        duration: '10 Weeks',
        pricing: { amount: 75000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'LLM Basics', topics: toTopics(['GPT Models', 'Prompt Engineering']) }
        ]
    },
    {
        name: 'Computer Vision with OpenCV',
        slug: 'computer-vision',
        tagline: 'Object detection, image processing - see with AI.',
        description: 'Master computer vision with OpenCV for object detection and image processing.',
        category: 'AI & ML',
        imageUrl: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=2048&auto=format&fit=crop',
        duration: '8 Weeks',
        pricing: { amount: 60000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Image Processing', topics: toTopics(['OpenCV Basics', 'Filters']) }
        ]
    },
    {
        name: 'NLP & Text Analytics',
        slug: 'nlp-text-analytics',
        tagline: 'Chatbots, sentiment analysis - understand language.',
        description: 'Build chatbots and analyze text with Natural Language Processing.',
        category: 'AI & ML',
        imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop',
        duration: '8 Weeks',
        pricing: { amount: 58000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'NLP Fundamentals', topics: toTopics(['Tokenization', 'NER']) }
        ]
    },
    {
        name: 'Data Engineering (Python + SQL)',
        slug: 'data-engineering',
        tagline: 'ETL pipelines + storage - build data infrastructure.',
        description: 'Master data engineering with ETL pipelines, data warehousing, and big data tools.',
        category: 'Data Science',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
        duration: '10 Weeks',
        pricing: { amount: 70000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'ETL Basics', topics: toTopics(['Data Pipelines', 'Apache Airflow']) }
        ]
    },

    // Cybersecurity Courses
    {
        name: 'Ethical Hacking & Cybersecurity',
        slug: 'ethical-hacking',
        tagline: 'Kali tools, OWASP - protect and defend systems.',
        description: 'Learn ethical hacking, penetration testing, and cybersecurity fundamentals.',
        category: 'Cybersecurity',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
        duration: '10 Weeks',
        pricing: { amount: 65000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Hacking Basics', topics: toTopics(['Kali Linux', 'Reconnaissance']) }
        ]
    },
    {
        name: 'Network Security & Pen-Testing',
        slug: 'network-security',
        tagline: 'Wireshark + Burp Suite - secure networks.',
        description: 'Master network security and penetration testing with industry-standard tools.',
        category: 'Cybersecurity',
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
        duration: '8 Weeks',
        pricing: { amount: 60000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Network Fundamentals', topics: toTopics(['TCP/IP', 'Wireshark']) }
        ]
    },
    {
        name: 'SOC Analyst Internship',
        slug: 'soc-analyst',
        tagline: 'Security monitoring - real-world SOC experience.',
        description: 'Gain hands-on experience as a Security Operations Center analyst.',
        category: 'Cybersecurity',
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
        duration: '6 Weeks',
        pricing: { amount: 45000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'SOC Operations', topics: toTopics(['SIEM', 'Incident Response']) }
        ]
    },
    {
        name: 'Cyber Forensics',
        slug: 'cyber-forensics',
        tagline: 'Evidence recovery - investigate cyber crimes.',
        description: 'Learn digital forensics and cyber crime investigation techniques.',
        category: 'Cybersecurity',
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop',
        duration: '8 Weeks',
        pricing: { amount: 55000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Forensics Basics', topics: toTopics(['Evidence Collection', 'Analysis']) }
        ]
    },
    {
        name: 'Cloud Security',
        slug: 'cloud-security',
        tagline: 'Secure AWS deployment - protect cloud infrastructure.',
        description: 'Master cloud security practices for AWS, Azure, and GCP.',
        category: 'Cybersecurity',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
        duration: '8 Weeks',
        pricing: { amount: 60000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Cloud Security', topics: toTopics(['IAM', 'Encryption']) }
        ]
    },

    // Career & Internship Programs
    {
        name: 'Mini Project Internship',
        slug: 'mini-project-internship',
        tagline: 'Guided project - build your portfolio.',
        description: 'Work on a guided project to build your portfolio and gain practical experience.',
        category: 'Career Development',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
        duration: '4 Weeks',
        pricing: { amount: 25000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Project Planning', topics: toTopics(['Requirements', 'Design']) }
        ]
    },
    {
        name: 'Career & Resume Building',
        slug: 'career-resume-building',
        tagline: 'Resume + LinkedIn - stand out to recruiters.',
        description: 'Build a professional resume, optimize LinkedIn, and prepare for job search.',
        category: 'Career Development',
        imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop',
        duration: '2 Weeks',
        pricing: { amount: 15000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Resume Building', topics: toTopics(['ATS Optimization', 'LinkedIn']) }
        ]
    },
    {
        name: 'Aptitude + Coding Prep',
        slug: 'aptitude-coding-prep',
        tagline: 'Job readiness - ace interviews.',
        description: 'Prepare for aptitude tests and coding interviews at top companies.',
        category: 'Career Development',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
        duration: '6 Weeks',
        pricing: { amount: 30000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Aptitude', topics: toTopics(['Quantitative', 'Logical Reasoning']) }
        ]
    },
    {
        name: 'Freelancing & Startup Bootcamp',
        slug: 'freelancing-startup',
        tagline: 'Monetize skills - build your business.',
        description: 'Learn to freelance or start your own tech startup.',
        category: 'Career Development',
        imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop',
        duration: '4 Weeks',
        pricing: { amount: 35000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Freelancing', topics: toTopics(['Upwork', 'Fiverr', 'Pricing']) }
        ]
    },

    // Starter Packs
    {
        name: 'Starter Tech Intern Pack - Web Dev',
        slug: 'starter-pack-web',
        tagline: 'Python + Web Dev - kickstart your tech career.',
        description: 'Complete package combining Python and Web Development for beginners.',
        category: 'Internship',
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
        duration: '12 Weeks',
        pricing: { amount: 50000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Python Basics', topics: toTopics(['Variables', 'Functions']) }
        ]
    },
    {
        name: 'Starter Tech Intern Pack - Data Science',
        slug: 'starter-pack-data-science',
        tagline: 'Python + ML + Data Science - become a data professional.',
        description: 'Comprehensive package for aspiring data scientists and ML engineers.',
        category: 'Internship',
        imageUrl: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=2074&auto=format&fit=crop',
        duration: '14 Weeks',
        pricing: { amount: 60000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Python for DS', topics: toTopics(['Pandas', 'NumPy']) }
        ]
    },
    {
        name: 'Starter Tech Intern Pack - Security',
        slug: 'starter-pack-security',
        tagline: 'Cybersecurity + Cloud - protect digital assets.',
        description: 'Complete security package covering cybersecurity and cloud security.',
        category: 'Internship',
        imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop',
        duration: '12 Weeks',
        pricing: { amount: 55000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Security Basics', topics: toTopics(['Networking', 'Encryption']) }
        ]
    },

    // IoT & Drone Courses (ECE Department)
    {
        name: 'Fixed Wing Drone Development',
        slug: 'fixed-wing-drone',
        tagline: 'Transmitter & Receiver Based, IoT device based.',
        description: 'Build and program fixed wing drones with transmitter/receiver and IoT integration.',
        category: 'IoT & Drones',
        imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070&auto=format&fit=crop',
        duration: '8 Weeks',
        pricing: { amount: 48000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Drone Basics', topics: toTopics(['Aerodynamics', 'Components']) }
        ]
    },
    {
        name: 'FPV Drones',
        slug: 'fpv-drones',
        tagline: 'First Person View - immersive drone flying.',
        description: 'Build and fly FPV racing drones with real-time video transmission.',
        category: 'IoT & Drones',
        imageUrl: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=2070&auto=format&fit=crop',
        duration: '6 Weeks',
        pricing: { amount: 42000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'FPV Systems', topics: toTopics(['Cameras', 'Transmitters']) }
        ]
    },
    {
        name: 'Mobile-Connected Drones',
        slug: 'mobile-drones',
        tagline: 'Control drones via smartphone.',
        description: 'Build drones controlled through mobile applications.',
        category: 'IoT & Drones',
        imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2070&auto=format&fit=crop',
        duration: '6 Weeks',
        pricing: { amount: 40000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Mobile Integration', topics: toTopics(['Bluetooth', 'WiFi']) }
        ]
    },
    {
        name: 'Micro Drones',
        slug: 'micro-drones',
        tagline: 'Small but powerful - build tiny drones.',
        description: 'Design and build compact micro drones for indoor flying.',
        category: 'IoT & Drones',
        imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=2070&auto=format&fit=crop',
        duration: '5 Weeks',
        pricing: { amount: 35000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Miniaturization', topics: toTopics(['Small Motors', 'Batteries']) }
        ]
    },
    {
        name: 'Arduino-Based Drones',
        slug: 'arduino-drones',
        tagline: 'Program drones with Arduino.',
        description: 'Build programmable drones using Arduino microcontrollers.',
        category: 'IoT & Drones',
        imageUrl: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=2070&auto=format&fit=crop',
        duration: '7 Weeks',
        pricing: { amount: 45000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Arduino Programming', topics: toTopics(['C++', 'Sensors']) }
        ]
    },
    {
        name: 'Raspberry Pi Drones',
        slug: 'raspberry-pi-drones',
        tagline: 'Advanced computing for drones.',
        description: 'Build intelligent drones with Raspberry Pi for advanced processing.',
        category: 'IoT & Drones',
        imageUrl: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=2070&auto=format&fit=crop',
        duration: '8 Weeks',
        pricing: { amount: 50000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Raspberry Pi', topics: toTopics(['Python', 'GPIO']) }
        ]
    },
    {
        name: 'ESP-32 Based Drones',
        slug: 'esp32-drones',
        tagline: 'WiFi-enabled drone development.',
        description: 'Build IoT-connected drones using ESP-32 microcontrollers.',
        category: 'IoT & Drones',
        imageUrl: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2070&auto=format&fit=crop',
        duration: '7 Weeks',
        pricing: { amount: 43000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'ESP-32', topics: toTopics(['WiFi', 'Bluetooth']) }
        ]
    },
    {
        name: 'Auto Flight Control Drones',
        slug: 'auto-flight-drones',
        tagline: 'Autonomous navigation and control.',
        description: 'Build drones with autonomous flight capabilities and GPS navigation.',
        category: 'IoT & Drones',
        imageUrl: 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?q=80&w=2070&auto=format&fit=crop',
        duration: '10 Weeks',
        pricing: { amount: 55000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Autopilot Systems', topics: toTopics(['GPS', 'IMU']) }
        ]
    },
    {
        name: 'Multi-Rotor Drones',
        slug: 'multi-rotor-drones',
        tagline: 'Quadcopters and hexacopters.',
        description: 'Build multi-rotor drones with transmitter/receiver and IoT capabilities.',
        category: 'IoT & Drones',
        imageUrl: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2070&auto=format&fit=crop',
        duration: '8 Weeks',
        pricing: { amount: 47000, currency: 'INR' },
        curriculum: [
            { week: 1, title: 'Multi-Rotor Design', topics: toTopics(['Stability', 'Control']) }
        ]
    }
];

async function addCourses() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const inserted = await Course.insertMany(newCourses);
        console.log(`✅ Added ${inserted.length} new courses`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

addCourses();
