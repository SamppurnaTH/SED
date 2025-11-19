import express from 'express';
const router = express.Router();
import Submission from '../models/Submission.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { contactValidator } from '../middleware/validators.js';
import { GoogleGenAI } from '@google/genai';

// @desc    Get all contact submissions
// @route   GET /api/submissions
// @access  Private/Admin
router.get('/', protectAdmin, async (req, res) => {
    try {
        const submissions = await Submission.find({}).sort({ submittedAt: -1 });
        res.json(submissions.map(sub => ({
            ...sub.toObject(),
            id: sub._id // Map _id to id for frontend compatibility
        })));
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a new contact submission and get an AI reply
// @route   POST /api/submissions
// @access  Public
router.post('/', contactValidator, async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const newSubmission = await Submission.create({
            submittedAt: new Date().toISOString(),
            name,
            email,
            subject: subject || 'No Subject',
            message,
        });

        // Initialize AI only if we have a key, but don't fail the whole request if AI fails
        let replyText = `Thank you for contacting us, ${name}! We have received your message and a member of our team will get back to you shortly.`;
        
        if (process.env.API_KEY) {
             try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const prompt = `
                    You are a friendly and helpful support agent for a tech training academy called "SCHOLASTIC A EDU. DEPOT".
                    A user named "${name}" has sent a message through the contact form.
                    Their email is: ${email}
                    The subject of their message is: "${subject || 'No Subject'}"
                    Their message is: "${message}"
        
                    Please provide a warm, reassuring, and helpful response. Acknowledge their message, thank them for reaching out, and let them know that a member of the support team will get back to them at their email address shortly regarding their specific query. Keep the tone professional yet approachable. Address them by their name.
                `;
        
                const response = await ai.models.generateContent({
                  model: 'gemini-2.5-flash',
                  contents: prompt,
                });
                
                if (response.text) {
                    replyText = response.text;
                }
             } catch (aiError) {
                 console.error("AI Reply Generation Failed:", aiError);
                 // Fallback to default message
             }
        }

        res.status(201).json({ 
            message: 'Submission received. Thank you!', 
            replyText: replyText 
        });

    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ message: 'Server Error: Could not save submission.' });
    }
});

export default router;