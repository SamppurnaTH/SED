const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Connect to MongoDB with explicit database name
const mongoUri = new URL(process.env.MONGO_URI);
const dbName = 'sedtech' || mongoUri.pathname.replace('/', '');

// Connect with the database name
mongoose.connect(process.env.MONGO_URI, {
    dbName: dbName
}).then(() => {
    console.log('Connected to MongoDB');
    seedUsers();
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

async function seedUsers() {
    try {
        // Delete existing test users if they exist
        await User.deleteMany({
            email: { 
                $in: [
                    'admin@sedtech.com',
                    'marketing@sedtech.com',
                    'student@sedtech.com'
                ] 
            }
        });
        console.log('Cleaned up existing test users');

        // Hash passwords
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('Admin@1234', salt);
        const marketingPassword = await bcrypt.hash('Marketing@1234', salt);
        const studentPassword = await bcrypt.hash('Student@1234', salt);

        // Create test users
        const users = [
            {
                name: 'Admin User',
                email: 'admin@sedtech.com',
                password: adminPassword,
                role: 'Admin',
                isVerified: true
            },
            {
                name: 'Marketing Agent',
                email: 'marketing@sedtech.com',
                password: marketingPassword,
                role: 'MarketingAgent',
                isVerified: true
            },
            {
                name: 'Test Student',
                email: 'student@sedtech.com',
                password: studentPassword,
                role: 'Student',
                isVerified: true
            }
        ];

        // Save users to database
        await User.insertMany(users);
        console.log('Test users created successfully!');
        console.log('\nTest Accounts:');
        console.log('--------------');
        console.log('Admin:');
        console.log('  Email: admin@sedtech.com');
        console.log('  Password: Admin@1234\n');
        
        console.log('Marketing Agent:');
        console.log('  Email: marketing@sedtech.com');
        console.log('  Password: Marketing@1234\n');
        
        console.log('Student:');
        console.log('  Email: student@sedtech.com');
        console.log('  Password: Student@1234\n');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
}
