const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin', 'marketing', 'trainer'], default: 'student' },
  avatarUrl: String,
  isVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  enrolledCourses: [{
    courseSlug: String,
    progress: { type: Number, default: 0 },
    completedLessons: [String] // Array of topic strings or IDs that are completed
  }],
  savedCourses: [String],
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });


// Method to generate and hash email verification token
userSchema.methods.getEmailVerificationToken = function () {
    // Generate token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to emailVerificationToken field
    this.emailVerificationToken = crypto
        .createHash('sha256')
        .update(verificationToken)
        .digest('hex');

    // Set expire time (e.g., 15 minutes)
    this.emailVerificationExpire = Date.now() + 15 * 60 * 1000;

    return verificationToken;
};


const User = mongoose.model('User', userSchema);

module.exports = User;