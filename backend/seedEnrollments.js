const mongoose = require('mongoose');
const Enrollment = require('./models/Enrollment');
const User = require('./models/User');
const Course = require('./models/Course');

const MONGO_URI = 'mongodb+srv://venuthota722_db_user:i4BpyDzK6CGgozTB@cluster0.aqhzbnd.mongodb.net/SED_DB?retryWrites=true&w=majority&ssl=true&appName=Cluster0';

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB Atlas');

        // Get admin user and first course
        const admin = await User.findOne({ email: 'venuthota722@gmail.com' });
        const course = await Course.findOne();

        if (!admin) {
            console.log('Admin user not found');
            process.exit(1);
        }

        if (!course) {
            console.log('No courses found. Please seed courses first.');
            process.exit(1);
        }

        // Create sample enrollments
        const sampleEnrollments = [
            {
                student: admin._id,
                course: course._id,
                status: 'completed',
                enrolledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
                completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
                progress: 100,
                paymentStatus: 'paid',
                amount: 15000
            },
            {
                student: admin._id,
                course: course._id,
                status: 'in-progress',
                enrolledAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
                progress: 45,
                paymentStatus: 'paid',
                amount: 12000
            },
            {
                student: admin._id,
                course: course._id,
                status: 'pending',
                enrolledAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
                progress: 0,
                paymentStatus: 'pending',
                amount: 18000
            }
        ];

        // Clear existing enrollments
        await Enrollment.deleteMany({});
        console.log('Cleared existing enrollments');

        // Insert sample enrollments
        await Enrollment.insertMany(sampleEnrollments);
        console.log('✅ Created 3 sample enrollments');

        // Verify
        const count = await Enrollment.countDocuments();
        console.log(`Total enrollments in database: ${count}`);

        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
