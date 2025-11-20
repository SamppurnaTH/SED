// Load environment variables first
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const path = require('path');
const resolve = path.resolve;
const join = path.join;

// Get MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MongoDB connection string is not defined in .env file');
  process.exit(1);
}

// Import dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bcrypt = require('bcryptjs');

// Import routes
const authRoutes = require('./routes/authRoutes.js');
const coursesRoutes = require('./routes/coursesRoutes.js');
const partnersRoutes = require('./routes/partnersRoutes.js');
const servicesRoutes = require('./routes/servicesRoutes.js');
const blogRoutes = require('./routes/blogRoutes.js');
const submissionsRoutes = require('./routes/submissionsRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const aiRoutes = require('./routes/aiRoutes.js');

// Import models for seeding
const Course = require('./models/Course.js');
const Partner = require('./models/Partner.js');
const Service = require('./models/Service.js');
const BlogPost = require('./models/BlogPost.js');
const User = require('./models/User.js');
const data = require('./data.js');
const initialCourses = data.courses;
const initialPartners = data.partners;
const initialServices = data.services;
const initialBlogPosts = data.blogPosts;

const app = express();
const port = process.env.PORT || 3001;

// --- SECURITY & PERFORMANCE MIDDLEWARE ---

// 1. Helmet: Sets various HTTP headers to secure the app.
// The Content Security Policy is configured to allow necessary third-party scripts and assets.
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.tailwindcss.com", "https://aistudiocdn.com", "https://checkout.razorpay.com", "'unsafe-inline'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "https:", "data:"],
      connectSrc: ["'self'"], 
      frameSrc: ["'self'", "https://www.youtube.com", "https://www.google.com", "https://api.razorpay.com"],
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 2. Compression: Gzip compress responses for performance
app.use(compression());

// 3. CORS: Configure a strict whitelist for production
const whitelist = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : ['http://localhost:5173', 'http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests) and whitelisted origins
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));

// 4. Body Parser
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// 5. Cookie Parser
app.use(cookieParser());

// 6. CSRF Protection - Only apply to non-API routes
const csrfProtection = csrf({
  cookie: {
    key: '_csrf',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE'] // Disable CSRF for all API methods
});

// Apply CSRF protection only to non-API routes
app.use((req, res, next) => {
  if (!req.path.startsWith('/api/')) {
    return csrfProtection(req, res, next);
  }
  next();
});

// Add CSRF token to all responses for non-API routes
app.use((req, res, next) => {
  if (req.csrfToken && !req.path.startsWith('/api/')) {
    res.cookie('XSRF-TOKEN', req.csrfToken(), {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false,
      sameSite: 'strict'
    });
  }
  next();
});

// 7. Request Logging Middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        // In production, you would use a structured logger like Winston
        // logger.info({ method: req.method, url: req.originalUrl, status: res.statusCode, duration });
        console.log(`[Request Log] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    next();
});

// 8. Rate Limiting: Prevent brute-force and DDoS
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', apiLimiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many login attempts, please try again later'
});
app.use('/api/auth', authLimiter);

// Make the uploads folder static
app.use('/uploads', express.static(join(__dirname, 'uploads')));

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

// --- ROUTES ---

// Endpoint to get the CSRF token
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Apply CSRF protection to all routes except specific ones
const csrfExcludedPaths = [
    '/api/auth/register/student',
    '/api/auth/login',
    '/api/auth/delete-account',
    '/api/csrf-token'
];

// Middleware to apply CSRF protection conditionally
const csrfUnless = (paths, middleware) => {
    return (req, res, next) => {
        if (paths.some(path => req.path.startsWith(path))) {
            return next();
        }
        return middleware(req, res, next);
    };
};

// Apply routers with conditional CSRF protection
app.use('/api/auth', csrfUnless(csrfExcludedPaths, csrfProtection), authRoutes);
app.use('/api/courses', csrfProtection, coursesRoutes);
app.use('/api/partners', csrfProtection, partnersRoutes);
app.use('/api/services', csrfProtection, servicesRoutes);
app.use('/api/blog', csrfProtection, blogRoutes);
app.use('/api/submissions', csrfProtection, submissionsRoutes);
app.use('/api/user', csrfProtection, userRoutes);
app.use('/api/upload', csrfProtection, uploadRoutes);
app.use('/api/orders', csrfProtection, orderRoutes);
app.use('/api/ai', csrfProtection, aiRoutes);

app.get('/', (req, res) => {
  res.send('SED Backend is running with MongoDB, File Storage, Compression, Security Headers, and AI Proxy!');
});

// --- GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  // Handle CSRF token errors specifically
  if (err.code === 'EBADCSRFTOKEN') {
    console.warn(`[CSRF Error] Invalid token for request: ${req.method} ${req.originalUrl}`);
    return res.status(403).json({ message: 'Invalid CSRF token. Please refresh the page and try again.' });
  }

  // Structured Error Logging
  const statusCode = err.statusCode || 500;
  const errorLog = {
    timestamp: new Date().toISOString(),
    level: 'error',
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? 'Stack trace hidden in production' : err.stack,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
  };
  
  // In production, you would use a dedicated logger like Winston or Pino
  // to write logs to a file or a logging service (e.g., Datadog, Sentry).
  // This enables alerting and easier analysis.
  // Example with Winston: logger.error(errorLog);
  console.error(JSON.stringify(errorLog, null, 2));
  
  // Send appropriate response to the client
  if (process.env.NODE_ENV === 'production') {
    res.status(statusCode).json({
      message: statusCode >= 500 ? 'An unexpected server error occurred.' : err.message,
    });
  } else {
    // In development, send more detailed error info
    res.status(statusCode).json({
      message: err.message,
      stack: err.stack,
    });
  }
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
});

module.exports = app;