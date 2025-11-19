import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { protectStudent } from '../middleware/authMiddleware.js';
import { registerValidator, loginValidator, updatePasswordValidator } from '../middleware/validators.js';
import sendEmail from '../utils/sendEmail.js';

const router = express.Router();

const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("FATAL ERROR: JWT_SECRET is not defined in the environment variables.");
    }
    return secret;
};

const setTokenCookie = (res, token, role) => {
    const cookieName = (role === 'student') ? 'student_session_token' : 'admin_session_token';
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    };
    res.cookie(cookieName, token, cookieOptions);
};

const sendVerificationEmail = async (user, req) => {
    const verificationToken = user.getEmailVerificationToken();
    await user.save();

    const frontendBaseUrl = req.headers.origin || 'http://localhost:5173';
    const verificationUrl = `${frontendBaseUrl}/#/verify-email/${verificationToken}`;
    
    const message = `
        Hi ${user.name},

        Thank you for registering with SCHOLASTIC A EDU. DEPOT!
        
        Please verify your email address by clicking the link below:
        ${verificationUrl}
        
        This link will expire in 15 minutes.
        
        If you did not create an account, please ignore this email.
        
        Best Regards,
        The SED Team
    `;

    await sendEmail({
        email: user.email,
        subject: 'Verify Your Email Address',
        message
    });
};

// POST /api/auth/register
router.post('/register', registerValidator, async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
        if (user) {
            // If user exists but is not verified, allow re-registration to send new email
            if (!user.isVerified) {
                // Update password and name, then resend verification
                user.name = name;
                user.password = await bcrypt.hash(password, 10);
                await sendVerificationEmail(user, req);
                return res.status(200).json({ message: 'Verification email resent. Please check your inbox.' });
            }
            return res.status(400).json({ message: 'User with this email already exists and is verified.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 'student'
        });

        await sendVerificationEmail(newUser, req);

        res.status(201).json({
            message: 'Registration successful. Please check your email to verify your account.'
        });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET /api/auth/verify-email/:token
router.get('/verify-email/:token', async (req, res) => {
    try {
        const verificationToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        
        const user = await User.findOne({
            emailVerificationToken: verificationToken,
            emailVerificationExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification token.' });
        }

        user.isVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpire = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully. You can now log in.' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


// POST /api/auth/resend-verification
router.post('/resend-verification', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User with this email not found.' });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: 'This account is already verified.' });
        }

        await sendVerificationEmail(user, req);

        res.status(200).json({ message: 'Verification email sent successfully.' });

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
        
        // Admins/Trainers don't need email verification to log in
        if (user.role === 'student' && !user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email address before logging in.', needsVerification: true });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            getJwtSecret(),
            { expiresIn: '30d' }
        );
        
        setTokenCookie(res, token, user.role);
        
        res.status(200).json({
            message: 'Login successful',
            user: { name: user.name, email: user.email, role: user.role, avatarUrl: user.avatarUrl }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
    res.cookie('student_session_token', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    res.cookie('admin_session_token', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

const meHandler = async (req, res, cookieName) => {
    const token = req.cookies[cookieName];
    if (!token) {
        return res.json({ user: null });
    }

    try {
        const decoded = jwt.verify(token, getJwtSecret());
        const user = await User.findOne({ email: decoded.email }).select('-password');
        
        if (!user || !user.isVerified && user.role === 'student') {
            return res.json({ user: null });
        }

        res.json({ user: { name: user.name, email: user.email, role: user.role, avatarUrl: user.avatarUrl } });
    } catch (e) {
        // If token is invalid or expired
        res.json({ user: null });
    }
};

router.get('/me/student', (req, res) => meHandler(req, res, 'student_session_token'));
router.get('/me/admin', (req, res) => meHandler(req, res, 'admin_session_token'));


// POST /api/auth/update-password (Authenticated)
router.post('/update-password', protectStudent, updatePasswordValidator, async (req, res) => {
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

export default router;