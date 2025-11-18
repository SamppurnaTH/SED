require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

// Route imports
const authRoutes = require('./routes/authRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const partnersRoutes = require('./routes/partnersRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const blogRoutes = require('./routes/blogRoutes');
const submissionsRoutes = require('./routes/submissionsRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const orderRoutes = require('./routes/orderRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Models for seeding
const Course = require('./models/Course');
const Partner = require('./models/Partner');
const Service = require('./models/Service');
const BlogPost = require('./models/BlogPost');
const User = require('./models/User');
const { courses: initialCourses, partners: initialPartners, services: initialServices, blogPosts: initialBlogPosts } = require('./data');

const app = express();
const port = 3001;
// Prioritize env var, fallback to hardcoded string (simulated production readiness)
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://venuthota722_db_user:AW1QFoxvsdswivs7@cluster0.7xf3go4.mongodb.net/?appName=Cluster0';

// --- SECURITY & PERFORMANCE MIDDLEWARE ---

// 1. Helmet: Sets various HTTP headers to secure the app
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" } // Allow loading images from uploads folder
}));

// 2. Compression: Gzip compress responses for performance
app.use(compression());

// 3. CORS: Allow requests
app.use(cors());

// 4. Body Parser
app.use(bodyParser.json({ limit: '10mb' })); // Keep limit for json data
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// 5. Rate Limiting: Prevent brute-force and DDoS
// General limiter for all API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', apiLimiter);

// Stricter limiter for Auth routes (Login/Register)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 login/register attempts
  message: 'Too many login attempts, please try again later'
});
app.use('/api/auth', authLimiter);


// Make the uploads folder static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await seedData();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Seed Data Function
const seedData = async () => {
  try {
    // Seed Courses
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      await Course.insertMany(initialCourses);
      console.log('Courses seeded');
    }

    // Seed Partners
    const partnerCount = await Partner.countDocuments();
    if (partnerCount === 0) {
      await Partner.insertMany(initialPartners);
      console.log('Partners seeded');
    }

    // Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(initialServices);
      console.log('Services seeded');
    }

    // Seed Blog Posts
    const blogCount = await BlogPost.countDocuments();
    if (blogCount === 0) {
      await BlogPost.insertMany(initialBlogPosts);
      console.log('Blog posts seeded');
    }

    // Seed Initial Users
    const userCount = await User.countDocuments();
    if (userCount === 0) {
        const salt = bcrypt.genSaltSync(10);
        const usersToSeed = [
             {
                name: 'Demo Student',
                email: 'student@example.com',
                password: bcrypt.hashSync('password123', salt),
                role: 'student',
                enrolledCourses: [ { courseSlug: 'full-stack-development', progress: 0, completedLessons: [] } ],
                savedCourses: ['data-engineering']
            },
            {
                name: 'Admin User',
                email: 'admin@sed.com',
                password: bcrypt.hashSync('adminpassword123', salt),
                role: 'admin'
            },
             {
                name: 'Marketing User',
                email: 'marketing@sed.com',
                password: bcrypt.hashSync('marketingpassword123', salt),
                role: 'marketing'
            },
             {
                name: 'Trainer User',
                email: 'trainer@sed.com',
                password: bcrypt.hashSync('trainerpassword123', salt),
                role: 'trainer'
            }
        ];
        await User.insertMany(usersToSeed);
        console.log('Initial users seeded');
    }

  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/submissions', submissionsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/ai', aiRoutes);


app.get('/', (req, res) => {
  res.send('SED Backend is running with MongoDB, File Storage, Compression, Security Headers, and AI Proxy!');
});

// --- GLOBAL ERROR HANDLER ---
// Must be the last middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});