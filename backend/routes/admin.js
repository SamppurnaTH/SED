const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/stats', protect, authorize('admin'), async (req, res) => {
    try {
        // Get total revenue (sum of all paid enrollments)
        const revenueResult = await Enrollment.aggregate([
            { $match: { paymentStatus: 'paid' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        // Get active students count
        const activeStudents = await User.countDocuments({ role: 'student' });

        // Get total course enrollments
        const courseEnrollments = await Enrollment.countDocuments();

        // Get new instructors count (mentors added in last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newInstructors = await User.countDocuments({
            role: 'mentor',
            createdAt: { $gte: thirtyDaysAgo }
        });

        res.json({
            success: true,
            data: {
                totalRevenue,
                activeStudents,
                courseEnrollments,
                newInstructors
            }
        });
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard statistics'
        });
    }
});

// @route   GET /api/admin/enrollments/recent
// @desc    Get recent enrollments
// @access  Private/Admin
router.get('/enrollments/recent', protect, authorize('admin'), async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;

        const enrollments = await Enrollment.find()
            .populate('student', 'name email')
            .populate('course', 'title')
            .sort({ enrolledAt: -1 })
            .limit(limit);

        const formattedEnrollments = enrollments.map(enrollment => ({
            id: enrollment._id,
            studentName: enrollment.student?.name || 'Unknown',
            studentEmail: enrollment.student?.email,
            courseName: enrollment.course?.title || 'Unknown Course',
            date: enrollment.enrolledAt,
            status: enrollment.status,
            amount: enrollment.amount
        }));

        res.json({
            success: true,
            data: formattedEnrollments
        });
    } catch (error) {
        console.error('Error fetching recent enrollments:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching recent enrollments'
        });
    }
});

// @route   GET /api/admin/students
// @desc    Get all students
// @access  Private/Admin
router.get('/students', protect, authorize('admin'), async (req, res) => {
    try {
        const students = await User.find({ role: 'student' })
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching students'
        });
    }
});

// @route   GET /api/admin/instructors
// @desc    Get all instructors
// @access  Private/Admin
router.get('/instructors', protect, authorize('admin'), async (req, res) => {
    try {
        const instructors = await User.find({ role: 'mentor' })
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: instructors.length,
            data: instructors
        });
    } catch (error) {
        console.error('Error fetching instructors:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching instructors'
        });
    }
});

// @route   GET /api/admin/courses
// @desc    Get all courses
// @access  Private/Admin
router.get('/courses', protect, authorize('admin'), async (req, res) => {
    try {
        const courses = await Course.find()
            .populate('instructor', 'name email')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching courses'
        });
    }
});

// @route   GET /api/admin/analytics
// @desc    Get analytics data
// @access  Private/Admin
router.get('/analytics', protect, authorize('admin'), async (req, res) => {
    try {
        // Revenue trends (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const revenueTrends = await Enrollment.aggregate([
            {
                $match: {
                    paymentStatus: 'paid',
                    enrolledAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$enrolledAt' },
                        month: { $month: '$enrolledAt' }
                    },
                    revenue: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        // Student growth
        const studentGrowth = await User.aggregate([
            {
                $match: {
                    role: 'student',
                    createdAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        // Course performance
        const coursePerformance = await Enrollment.aggregate([
            { $match: { status: 'completed' } },
            {
                $group: {
                    _id: '$course',
                    completions: { $sum: 1 }
                }
            },
            { $sort: { completions: -1 } },
            { $limit: 10 }
        ]);

        const populatedCourses = await Course.populate(coursePerformance, {
            path: '_id',
            select: 'title'
        });

        res.json({
            success: true,
            data: {
                revenueTrends,
                studentGrowth,
                coursePerformance: populatedCourses
            }
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching analytics data'
        });
    }
});

module.exports = router;
