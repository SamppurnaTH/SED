import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  submittedAt: String
}, { timestamps: true });

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;