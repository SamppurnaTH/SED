import request from 'supertest';
import app from '../../backend/server.js';
import mongoose from 'mongoose';
import BlogPost from '../../backend/models/BlogPost.js';
import User from '../../backend/models/User.js';

// Test data
const testAdmin = {
  name: 'Admin User',
  email: 'admin@test.com',
  password: 'adminpassword123',
  role: 'admin'
};

const testBlogPost = {
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  excerpt: 'This is a test blog post',
  content: 'This is the content of the test blog post',
  featuredImage: 'test-image.jpg',
  categories: ['test', 'technology'],
  tags: ['test', 'blog'],
  isPublished: true,
  author: ''
};

describe('Blog API', () => {
  let authToken;
  let testPostId;

  // Connect to database and create test data
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create admin user and get auth token
    const admin = await User.create(testAdmin);
    testBlogPost.author = admin._id;
    
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: testAdmin.email,
        password: testAdmin.password
      });
    
    const cookie = loginRes.headers['set-cookie'][0];
    authToken = cookie.split(';')[0];
  });

  // Clear database after each test
  afterEach(async () => {
    await BlogPost.deleteMany({});
  });

  // Close database connection after all tests
  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('GET /api/blog', () => {
    it('should get all blog posts', async () => {
      // Create test blog posts
      await BlogPost.create([
        { ...testBlogPost, slug: 'test-post-1' },
        { ...testBlogPost, slug: 'test-post-2', isPublished: false }
      ]);

      const res = await request(app).get('/api/blog');
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      // Should only return published posts
      expect(res.body.length).toBe(1);
      expect(res.body[0].slug).toBe('test-post-1');
    });
  });

  describe('GET /api/blog/:slug', () => {
    it('should get a single blog post by slug', async () => {
      const post = await BlogPost.create(testBlogPost);
      
      const res = await request(app).get(`/api/blog/${testBlogPost.slug}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.slug).toBe(testBlogPost.slug);
    });

    it('should return 404 for non-existent post', async () => {
      const res = await request(app).get('/api/blog/non-existent-slug');
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Blog post not found');
    });
  });

  describe('POST /api/blog', () => {
    it('should create a new blog post (admin only)', async () => {
      const newPost = {
        title: 'New Blog Post',
        slug: 'new-blog-post',
        excerpt: 'This is a new test post',
        content: 'Content of the new test post',
        categories: ['test'],
        tags: ['test', 'new'],
        isPublished: true
      };

      const res = await request(app)
        .post('/api/blog')
        .set('Cookie', authToken)
        .send(newPost);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.title).toBe(newPost.title);
      expect(res.body.slug).toBe(newPost.slug);
    });

    it('should not allow non-admin to create post', async () => {
      // Create a regular user
      const regularUser = await User.create({
        name: 'Regular User',
        email: 'regular@test.com',
        password: 'password123',
        role: 'student'
      });
      
      // Login as regular user
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'regular@test.com',
          password: 'password123'
        });
      
      const userCookie = loginRes.headers['set-cookie'][0].split(';')[0];
      
      const res = await request(app)
        .post('/api/blog')
        .set('Cookie', userCookie)
        .send(testBlogPost);
      
      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('message', 'Not authorized as an admin');
    });
  });

  describe('PUT /api/blog/:id', () => {
    let postId;
    
    beforeEach(async () => {
      const post = await BlogPost.create(testBlogPost);
      postId = post._id;
    });

    it('should update a blog post (admin only)', async () => {
      const updates = {
        title: 'Updated Blog Post',
        excerpt: 'This post has been updated',
        isPublished: false
      };

      const res = await request(app)
        .put(`/api/blog/${postId}`)
        .set('Cookie', authToken)
        .send(updates);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('title', updates.title);
      expect(res.body).toHaveProperty('excerpt', updates.excerpt);
      expect(res.body).toHaveProperty('isPublished', updates.isPublished);
    });
  });

  describe('DELETE /api/blog/:id', () => {
    let postId;
    
    beforeEach(async () => {
      const post = await BlogPost.create(testBlogPost);
      postId = post._id;
    });

    it('should delete a blog post (admin only)', async () => {
      const res = await request(app)
        .delete(`/api/blog/${postId}`)
        .set('Cookie', authToken);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Blog post removed');
      
      // Verify the post is deleted
      const deletedPost = await BlogPost.findById(postId);
      expect(deletedPost).toBeNull();
    });
  });
});
