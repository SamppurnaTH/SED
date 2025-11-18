const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: String,
  imageUrl: String,
  category: String,
  tags: [String],
  author: {
    name: String,
    imageUrl: String
  },
  publishedDate: String
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);