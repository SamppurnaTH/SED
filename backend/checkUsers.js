const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('Error: MONGO_URI environment variable is not set');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB Atlas');

        const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
        const count = await User.countDocuments();

        console.log('\n=== USER DATABASE STATS ===');
        console.log(`Total users in database: ${count}`);

        const users = await User.find({}, 'name email role').limit(20);
        console.log('\n=== USER LIST ===');
        users.forEach((u, index) => {
            console.log(`${index + 1}. ${u.name || 'N/A'} (${u.email}) - Role: ${u.role || 'N/A'}`);
        });

        // Count by role
        const students = await User.countDocuments({ role: 'student' });
        const instructors = await User.countDocuments({ role: 'instructor' });
        const admins = await User.countDocuments({ role: 'admin' });

        console.log('\n=== USERS BY ROLE ===');
        console.log(`Students: ${students}`);
        console.log(`Instructors: ${instructors}`);
        console.log(`Admins: ${admins}`);

        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
