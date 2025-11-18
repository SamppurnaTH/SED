const { body, validationResult } = require('express-validator');

// Helper middleware to check validation result
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
        message: 'Validation Error', 
        errors: errors.array().map(err => err.msg) 
    });
  }
  next();
};

// Auth Validators
const registerValidator = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validate
];

const loginValidator = [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').exists().withMessage('Password is required'),
    validate
];

// Course Validators
const courseValidator = [
    body('name').trim().notEmpty().withMessage('Course name is required'),
    body('slug').trim().notEmpty().matches(/^[a-z0-9-]+$/).withMessage('Slug must be lowercase alphanumeric with hyphens'),
    body('pricing.amount').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').notEmpty().withMessage('Category is required'),
    validate
];

// Contact Form Validator
const contactValidator = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('message').trim().notEmpty().withMessage('Message is required'),
    validate
];

module.exports = {
    registerValidator,
    loginValidator,
    courseValidator,
    contactValidator
};