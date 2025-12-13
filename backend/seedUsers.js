const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// MongoDB Atlas connection string from environment variable
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('Error: MONGO_URI environment variable is not set');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB Atlas');
    seedUsers();
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

async function seedUsers() {
    try {
        // Delete existing admin user if exists
        await User.deleteMany({
            email: 'venuthota722@gmail.com'
        });
        console.log('Cleaned up existing admin user');

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('Venuthota@1342$_03', salt);

        // Create admin user only
        const admin = {
            name: 'Venu Thota',
            email: 'venuthota722@gmail.com',
            password: adminPassword,
            role: 'Admin',
            isVerified: true
        };

        // Save admin to database
        await User.create(admin);
        console.log('Admin user created successfully!');
        console.log('\n=== ADMIN ACCOUNT CREATED ===');
        console.log('-----------------------------');
        console.log('Name: Venu Thota');
        console.log('Email: venuthota722@gmail.com');
        console.log('Password: Venuthota@1342$_03');
        console.log('Role: Admin\n');

        console.log('Note: Instructors, Support staff, and other users will be added by Admin.');
        console.log('Students can self-register through the signup form.');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin user:', error);
        process.exit(1);
    }
}