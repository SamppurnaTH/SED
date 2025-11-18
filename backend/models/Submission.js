const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  submittedAt: String
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);