const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin', 'marketing', 'trainer'], default: 'student' },
  avatarUrl: String,
  enrolledCourses: [{
    courseSlug: String,
    progress: { type: Number, default: 0 },
    completedLessons: [String] // Array of topic strings or IDs that are completed
  }],
  savedCourses: [String],
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);