
import express from 'express';
import BlogPost from '../models/BlogPost.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { blogPostValidator } from '../middleware/validators.js';
import setCache from '../middleware/cacheMiddleware.js';

const router = express.Router();

// @desc    Fetch all blog posts
// @route   GET /api/blog
// @access  Public
router.get('/', setCache(3600), async (req, res) => {
    try {
        const posts = await BlogPost.find({}).sort({ publishedDate: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Fetch single blog post
// @route   GET /api/blog/:slug
// @access  Public
router.get('/:slug', async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug });
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a blog post
// @route   POST /api/blog
// @access  Private/Admin
router.post('/', protectAdmin, blogPostValidator, async (req, res) => {
    try {
        const newPostData = { ...req.body, publishedDate: new Date().toISOString() };
        const existing = await BlogPost.findOne({ slug: newPostData.slug });
        if (existing) {
            return res.status(400).json({ message: 'Blog post with this slug already exists.' });
        }
        const newPost = await BlogPost.create(newPostData);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error: error.message });
    }
});

// @desc    Update a blog post
// @route   PUT /api/blog/:slug
// @access  Private/Admin
router.put('/:slug', protectAdmin, blogPostValidator, async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug });
        if (post) {
            const updatedPost = await BlogPost.findOneAndUpdate(
                { slug: req.params.slug },
                req.body,
                { new: true }
            );
            res.json(updatedPost);
        } else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Delete a blog post
// @route   DELETE /api/blog/:slug
// @access  Private/Admin
router.delete('/:slug', protectAdmin, async (req, res) => {
    try {
        const post = await BlogPost.findOneAndDelete({ slug: req.params.slug });
        if (post) {
            res.json({ message: 'Blog post removed' });
        } else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export default router;