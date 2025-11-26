
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const { protectStudent } = require('../middleware/authMiddleware');
const { userProfileValidators } = require('../middleware/validators');

// --- User Progress Routes ---

// @desc    Get current user's progress
// @route   GET /api/user/progress
// @access  Private/Student
router.get('/progress', protectStudent, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
             return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.enrolledCourses || []);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Enroll user in a course
// @route   POST /api/user/progress/enroll
// @access  Private/Student
router.post('/progress/enroll', protectStudent, userProfileValidators.enroll, async (req, res) => {
    const { courseSlug } = req.body;

    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
             return res.status(404).json({ message: 'User not found' });
        }

        const alreadyEnrolled = user.enrolledCourses.some(c => c.courseSlug === courseSlug);
        if (alreadyEnrolled) {
            return res.status(400).json({ message: 'Already enrolled in this course.' });
        }

        user.enrolledCourses.push({ courseSlug, progress: 0, completedLessons: [] });
        await user.save();

        res.status(201).json(user.enrolledCourses);
    } catch (error) {
         res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Mark a lesson as complete
// @route   POST /api/user/progress/complete-lesson
// @access  Private/Student
router.post('/progress/complete-lesson', protectStudent, userProfileValidators.completeLesson, async (req, res) => {
    const { courseSlug, lessonId } = req.body;
    
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const enrolledCourse = user.enrolledCourses.find(c => c.courseSlug === courseSlug);
        if (!enrolledCourse) return res.status(400).json({ message: 'Not enrolled in this course' });

        // Add lesson to completed list if not already there
        if (!enrolledCourse.completedLessons.includes(lessonId)) {
            enrolledCourse.completedLessons.push(lessonId);
        }

        // Calculate progress percentage
        const course = await Course.findOne({ slug: courseSlug });
        if (course) {
             let totalTopics = 0;
             course.curriculum.forEach(week => {
                 totalTopics += week.topics.length;
             });
             
             const completedCount = enrolledCourse.completedLessons.length;
             const newProgress = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
             
             enrolledCourse.progress = Math.min(newProgress, 100);
        }

        await user.save();
        res.json(user.enrolledCourses);

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Update profile image
// @route   PUT /api/user/profile-image
// @access  Private/Student
router.put('/profile-image', protectStudent, userProfileValidators.avatar, async (req, res) => {
    const { avatarUrl } = req.body;
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        user.avatarUrl = avatarUrl;
        await user.save();
        
        res.json({ message: 'Profile image updated', avatarUrl: user.avatarUrl });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});


// --- Saved Courses Routes ---

// @desc    Get current user's saved courses
// @route   GET /api/user/saved-courses
// @access  Private/Student
router.get('/saved-courses', protectStudent, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
             return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(user.savedCourses || []);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Save/unsave a course for later
// @route   POST /api/user/saved-courses
// @access  Private/Student
router.post('/saved-courses', protectStudent, userProfileValidators.saveCourse, async (req, res) => {
    const { courseName } = req.body;
    
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
             return res.status(404).json({ message: 'User not found' });
        }

        const courseIndex = user.savedCourses.indexOf(courseName);

        if (courseIndex > -1) {
            user.savedCourses.splice(courseIndex, 1);
        } else {
            user.savedCourses.push(courseName);
        }
        
        await user.save();

        res.status(200).json(user.savedCourses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;