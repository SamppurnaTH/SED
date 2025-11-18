
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { protectStudent } = require('../middleware/authMiddleware');
const { registerValidator, loginValidator } = require('../middleware/validators');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("FATAL ERROR: JWT_SECRET is not defined in the environment variables.");
}

// POST /api/auth/register
router.post('/register', registerValidator, async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'student'
        });

        const token = jwt.sign({ email: newUser.email, name: newUser.name, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });

        // Send Welcome Email
        try {
            const message = `Hi ${newUser.name},\n\nWelcome to SCHOLASTIC A EDU. DEPOT! We are thrilled to have you on board.\n\nYour account has been successfully created. Explore our industry-focused programs and start your journey towards a successful tech career today.\n\nIf you have any questions, feel free to reply to this email.\n\nBest Regards,\nThe SED Team`;

            await sendEmail({
                email: newUser.email,
                subject: 'Welcome to SED Tech Academy',
                message
            });
        } catch (emailError) {
            console.error("Welcome email failed to send:", emailError);
            // We don't return an error to the client if email fails, as registration was successful
        }

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { name: newUser.name, email: newUser.email, role: newUser.role, avatarUrl: newUser.avatarUrl }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// POST /api/auth/login
router.post('/login', loginValidator, async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        
        res.status(200).json({
            message: 'Login successful',
            token,
            user: { name: user.name, email: user.email, role: user.role, avatarUrl: user.avatarUrl }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// POST /api/auth/update-password (Authenticated)
router.post('/update-password', protectStudent, async (req, res) => {
    const { email } = req.user;
    const { currentPassword, newPassword } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Your current password is not correct.' });
        }
        
        if (newPassword.length < 6) {
             return res.status(400).json({ message: 'New password must be at least 6 characters long.' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// POST /api/auth/forgot-password (Public)
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
        if (!user) {
            // We return 200 even if user doesn't exist to prevent email enumeration
            return res.status(200).json({ message: 'Email sent' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Hash token and set to resetPasswordToken field
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Set expire (10 minutes)
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        // Create reset url
        // In production, use an environment variable for the frontend URL
        // Assuming standard port 5173 for Vite dev or served via relative path in prod
        // Adjust logic based on actual deployment URL
        const frontendBaseUrl = req.headers.origin || 'http://localhost:5173';
        const resetUrl = `${frontendBaseUrl}/#/reset-password/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please visit the following link to reset your password: \n\n ${resetUrl}`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Token',
                message
            });

            res.status(200).json({ message: 'Email sent' });
        } catch (err) {
            console.error(err);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return res.status(500).json({ message: 'Email could not be sent' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// POST /api/auth/reset-password/:resetToken (Public)
router.post('/reset-password/:resetToken', async (req, res) => {
    const { password } = req.body;
    
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }
        
        if (password.length < 6) {
             return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        // Set new password
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
