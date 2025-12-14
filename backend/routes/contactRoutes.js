const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Ensure this path matches where you create the model

// @desc    Submit a new contact message
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newContact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            data: newContact,
            message: 'Message sent successfully'
        });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error: Could not send message'
        });
    }
});

// @desc    Get all contact messages (Admin only - placeholder for future)
// @route   GET /api/contact
// @access  Private/Admin
router.get('/', async (req, res) => {
    // In a real app, ensure you add auth/admin middleware here
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
