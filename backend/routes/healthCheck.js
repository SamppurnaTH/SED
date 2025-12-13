const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage()
    });
});

// CSRF token check endpoint
router.get('/csrf-check', (req, res) => {
    res.status(200).json({
        success: true,
        cookies: req.cookies,
        headers: req.headers,
        hasCsrfToken: !!req.csrfToken
    });
});

// Auth check endpoint
router.get('/auth-check', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    res.status(200).json({
        success: true,
        hasAuthHeader: !!authHeader,
        hasToken: !!token,
        cookies: {
            session_token: !!req.cookies?.session_token,
            admin_session_token: !!req.cookies?.admin_session_token,
            _csrf: !!req.cookies?._csrf,
            'XSRF-TOKEN': !!req.cookies?.['XSRF-TOKEN']
        },
        headers: {
            origin: req.headers.origin,
            referer: req.headers.referer,
            'user-agent': req.headers['user-agent']
        }
    });
});

module.exports = router;
