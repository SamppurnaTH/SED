// Load environment variables first
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const path = require('path');
const resolve = path.resolve;
const join = path.join;

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MongoDB connection string is not defined in .env file');
  process.exit(1);
}

// Core dependencies
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

// Routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const serviceRoutes = require('./routes/servicesRoutes');
const partnerRoutes = require('./routes/partnersRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const healthCheckRoutes = require('./routes/healthCheck');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Models for seeding
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
const port = 5000;

// ---------------- MONGODB CONNECTION ----------------
const connectDB = async () => {
  try {
    // Parse the MongoDB URI to ensure it's valid
    let mongoUri = MONGO_URI;

    // Ensure the connection string has the correct format
    if (!mongoUri.includes('retryWrites')) {
      mongoUri += (mongoUri.includes('?') ? '&' : '?') + 'retryWrites=true&w=majority';
    }

    console.log('Attempting to connect to MongoDB...');

    // Connect with modern options
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      retryWrites: true,
      w: 'majority',
      ssl: true,
      tls: true,
      // Removed tlsInsecure as it conflicts with tlsAllowInvalidCertificates
      tlsAllowInvalidCertificates: true, // Only for development
      tlsAllowInvalidHostnames: true,    // Only for development
      family: 4, // Use IPv4
      // Add server API for MongoDB 5.0+
      serverApi: {
        version: '1',
        strict: false,
        deprecationErrors: true,
      },
      // Connection pool options
      maxPoolSize: 10, // Maximum number of connections in the connection pool
      minPoolSize: 1,  // Minimum number of connections in the connection pool
    });

    console.log('Successfully connected to MongoDB');

    // Seed initial data if needed
    try {
      await seedData();
    } catch (seedError) {
      console.error('Error seeding data:', seedError);
      // Don't exit if seeding fails, as the app might still work
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error('Connection details:', {
      host: mongoose.connection?.host,
      port: mongoose.connection?.port,
      name: mongoose.connection?.name
    });
    console.error('Please check your MongoDB Atlas connection string and ensure your IP is whitelisted.');
    process.exit(1);
  }
};


// ---------------- SECURITY MIDDLEWARE ----------------
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
    }
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(compression());

// ---------------- CORS ----------------
const whitelist = ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'X-XSRF-TOKEN'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  exposedHeaders: ['set-cookie', 'xsrf-token']
};

app.use(cors(corsOptions));

// Add CORS headers to all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// ---------------- PARSERS ----------------
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ---------------- CSRF SETUP ----------------
// Configure CSRF protection
const csrfProtection = csrf({
  cookie: {
    key: '_csrf',
    httpOnly: true, // The cookie is not accessible via JavaScript
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    sameSite: 'lax', // Protection against CSRF attacks
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
});

// Apply CSRF middleware to add req.csrfToken() function
app.use(csrfProtection);

// Apply CSRF protection to all routes except excluded ones
app.use((req, res, next) => {
  // List of routes to exclude from CSRF protection
  const csrfExcluded = [
    '/api/auth/csrf-token',
    '/api/auth/login',
    '/api/auth/register',
    '/api/health' // Add health check endpoint
  ];

  if (csrfExcluded.some(path => req.path.startsWith(path))) {
    return next();
  }

  // Skip CSRF validation for GET/HEAD/OPTIONS requests
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // Apply CSRF validation for other methods
  return csrfProtection(req, res, next);
});

// CSRF token endpoint (used by frontend)
app.get('/api/auth/csrf-token', (req, res) => {
  try {
    // Generate and return CSRF token
    const csrfToken = req.csrfToken();
    if (!csrfToken) {
      throw new Error('CSRF token generation failed');
    }

    // Set a non-httpOnly cookie for the frontend to read
    res.cookie('XSRF-TOKEN', csrfToken, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      httpOnly: false // Allow client-side JavaScript to read this cookie
    });

    res.json({ csrfToken });
  } catch (error) {
    console.error('Error generating CSRF token:', error);
    res.status(500).json({
      error: 'Failed to generate CSRF token',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// --------------- LOGGING ----------------
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () =>
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${Date.now() - start}ms)`)
  );
  next();
});

// --------------- RATE LIMITING ----------------
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 50 }));

// --------------- STATIC ----------------
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Remove duplicate MongoDB connection - using the one in connectDB() instead

async function seedData() {
  try {
    if (await Course.countDocuments() === 0) await Course.insertMany(initialCourses);
    if (await Partner.countDocuments() === 0) await Partner.insertMany(initialPartners);
    if (await Service.countDocuments() === 0) await Service.insertMany(initialServices);
    if (await BlogPost.countDocuments() === 0) await BlogPost.insertMany(initialBlogPosts);

    if (await User.countDocuments() === 0) {
      const salt = bcrypt.genSaltSync(10);
      await User.insertMany([
        { name: 'Admin User', email: 'admin@sed.com', password: bcrypt.hashSync('adminpassword123', salt), role: 'Admin' },
        { name: 'Student User', email: 'student@example.com', password: bcrypt.hashSync('password123', salt), role: 'Student' },
      ]);
    }
  } catch (err) {
    console.error("Seeding error:", err);
  }
}

// ---------------- ROUTES ----------------
app.use("/api/auth", authRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/assignments", require('./routes/assignmentRoutes'));
app.use("/api/certificates", require('./routes/certificateRoutes'));
app.use("/api/submissions", require('./routes/submissionsRoutes'));
app.use("/api/health", healthCheckRoutes);

app.get("/", (req, res) => {
  res.send("SED Backend Running");
});

// ---------------- ERROR HANDLER ----------------
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN" || err.code === "EBADCSRF") {
    return res.status(403).json({ message: "Invalid CSRF Token" });
  }
  console.error("Error:", err);
  res.status(500).json({ message: err.message });
});

// ---------------- START SERVER ----------------
// Only start the server after MongoDB is connected
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Start the server
startServer();

module.exports = app;
