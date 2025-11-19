
import express from 'express';
import Course from '../models/Course.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { courseValidator } from '../middleware/validators.js';
import setCache from '../middleware/cacheMiddleware.js';

const router = express.Router();

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
router.get('/', setCache(3600), async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Fetch single course
// @route   GET /api/courses/:slug
// @access  Public
router.get('/:slug', async (req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug });
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
router.post('/', protectAdmin, courseValidator, async (req, res) => {
    try {
        const existingCourse = await Course.findOne({ slug: req.body.slug });
        if (existingCourse) {
            return res.status(400).json({ message: 'Course with this slug already exists.' });
        }
        const newCourse = await Course.create(req.body);
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: 'Invalid course data', error: error.message });
    }
});

// @desc    Update a course
// @route   PUT /api/courses/:slug
// @access  Private/Admin
router.put('/:slug', protectAdmin, courseValidator, async (req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug });
        
        if (course) {
            // Check if slug is being updated and if it already exists
            if (req.body.slug && req.body.slug !== course.slug) {
                const existing = await Course.findOne({ slug: req.body.slug });
                if (existing) {
                    return res.status(400).json({ message: 'Course with this slug already exists.' });
                }
            }

            const updatedCourse = await Course.findOneAndUpdate(
                { slug: req.params.slug },
                req.body,
                { new: true }
            );
            res.json(updatedCourse);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Delete a course
// @route   DELETE /api/courses/:slug
// @access  Private/Admin
router.delete('/:slug', protectAdmin, async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({ slug: req.params.slug });
        if (course) {
            res.json({ message: 'Course removed' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Export the router as default
export default router;