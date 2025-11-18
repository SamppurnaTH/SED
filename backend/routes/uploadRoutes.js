
const express = require('express');
const multer = require('multer');
const path = require('path');
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
const router = express.Router();

// Initialize S3 Client
// Ensure these variables are set in your .env file
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Configure Multer to use S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set the Content-Type header
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            // Generate a unique filename
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, `uploads/${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
        }
    }),
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// File Filter to allow only images
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|webp|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Images only!'));
    }
}

// @desc    Upload an image to S3
// @route   POST /api/upload
// @access  Private (Admin)
router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
         return res.status(400).send({ message: 'No file uploaded' });
    }
    
    // req.file.location contains the public URL of the file in S3
    res.send({ 
        message: 'Image uploaded successfully',
        url: req.file.location 
    });
});

module.exports = router;
