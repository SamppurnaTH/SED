
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const protectAdmin = (req, res, next) => {
    const token = req.cookies.admin_session_token;

    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            
            if (decoded.role === 'admin' || decoded.role === 'marketing' || decoded.role === 'trainer') {
                req.user = decoded;
                return next(); // Token is valid, role is correct, proceed.
            } else {
                // User has a token but not the right role
                return res.status(403).json({ message: 'Forbidden: You do not have the required permissions.' });
            }
        } catch (error) {
            // Token is invalid (expired, tampered, etc.)
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        // No token found
        return res.status(401).json({ message: 'Not authorized, no admin token' });
    }
};

const protectStudent = (req, res, next) => {
    const token = req.cookies.student_session_token;

    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            return next(); // Token is valid, proceed.
        } catch (error) {
            // Token is invalid
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        // No token found
        return res.status(401).json({ message: 'Not authorized, no student token' });
    }
};

export { protectAdmin, protectStudent };
