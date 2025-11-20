import request from 'supertest';
import app from '../../backend/server.js';
import mongoose from 'mongoose';
import Course from '../../backend/models/Course.js';
import User from '../../backend/models/User.js';

// Test data
const testAdmin = {
  name: 'Admin User',
  email: 'admin@test.com',
  password: 'adminpassword123',
  role: 'admin'
};

const testCourse = {
  title: 'Test Course',
  slug: 'test-course',
  description: 'This is a test course',
  price: 99.99,
  duration: '4 weeks',
  level: 'Beginner',
  category: 'Programming',
  instructor: 'Test Instructor',
  isPublished: true,
  lessons: [
    {
      title: 'Introduction',
      content: 'Introduction to the course',
      duration: '10 minutes',
      videoUrl: 'https://example.com/video1'
    }
  ]
};

describe('Courses API', () => {
  let authToken;

  // Connect to database and create test data
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create admin user and get auth token
    await User.create(testAdmin);
    
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
    await Course.deleteMany({});
  });

  // Close database connection after all tests
  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('GET /api/courses', () => {
    it('should get all published courses', async () => {
      // Create test courses
      await Course.create([
        { ...testCourse, slug: 'test-course-1' },
        { ...testCourse, slug: 'test-course-2', isPublished: false }
      ]);

      const res = await request(app).get('/api/courses');
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      // Should only return published courses
      expect(res.body.length).toBe(1);
      expect(res.body[0].slug).toBe('test-course-1');
    });
  });

  describe('GET /api/courses/:slug', () => {
    it('should get a single course by slug', async () => {
      const course = await Course.create(testCourse);
      
      const res = await request(app).get(`/api/courses/${testCourse.slug}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.slug).toBe(testCourse.slug);
    });

    it('should return 404 for non-existent course', async () => {
      const res = await request(app).get('/api/courses/non-existent-slug');
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Course not found');
    });
  });

  describe('POST /api/courses', () => {
    it('should create a new course (admin only)', async () => {
      const newCourse = {
        title: 'New Course',
        slug: 'new-course',
        description: 'This is a new test course',
        price: 149.99,
        duration: '6 weeks',
        level: 'Intermediate',
        category: 'Web Development',
        instructor: 'John Doe',
        isPublished: true,
        lessons: [
          {
            title: 'Getting Started',
            content: 'Introduction to the course',
            duration: '15 minutes'
          }
        ]
      };

      const res = await request(app)
        .post('/api/courses')
        .set('Cookie', authToken)
        .send(newCourse);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.title).toBe(newCourse.title);
      expect(res.body.slug).toBe(newCourse.slug);
      expect(Array.isArray(res.body.lessons)).toBeTruthy();
      expect(res.body.lessons.length).toBe(1);
    });
  });

  describe('PUT /api/courses/:id', () => {
    let courseId;
    
    beforeEach(async () => {
      const course = await Course.create(testCourse);
      courseId = course._id;
    });

    it('should update a course (admin only)', async () => {
      const updates = {
        title: 'Updated Course Title',
        description: 'Updated course description',
        price: 129.99
      };

      const res = await request(app)
        .put(`/api/courses/${courseId}`)
        .set('Cookie', authToken)
        .send(updates);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('title', updates.title);
      expect(res.body).toHaveProperty('description', updates.description);
      expect(res.body).toHaveProperty('price', updates.price);
    });
  });

  describe('DELETE /api/courses/:id', () => {
    let courseId;
    
    beforeEach(async () => {
      const course = await Course.create(testCourse);
      courseId = course._id;
    });

    it('should delete a course (admin only)', async () => {
      const res = await request(app)
        .delete(`/api/courses/${courseId}`)
        .set('Cookie', authToken);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Course removed');
      
      // Verify the course is deleted
      const deletedCourse = await Course.findById(courseId);
      expect(deletedCourse).toBeNull();
    });
  });

  describe('Course Enrollment', () => {
    let courseId;
    let studentAuthToken;
    
    beforeAll(async () => {
      // Create a test course
      const course = await Course.create(testCourse);
      courseId = course._id;
      
      // Create a test student
      const student = await User.create({
        name: 'Test Student',
        email: 'student@test.com',
        password: 'student123',
        role: 'student'
      });
      
      // Login as student
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'student@test.com',
          password: 'student123'
        });
      
      const cookie = loginRes.headers['set-cookie'][0];
      studentAuthToken = cookie.split(';')[0];
    });

    it('should enroll a student in a course', async () => {
      const res = await request(app)
        .post(`/api/courses/${courseId}/enroll`)
        .set('Cookie', studentAuthToken);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Successfully enrolled in course');
      
      // Verify the user is enrolled
      const user = await User.findOne({ email: 'student@test.com' });
      expect(user.enrolledCourses).toContainEqual(
        expect.objectContaining({
          course: courseId,
          progress: 0,
          completedLessons: []
        })
      );
    });

    it('should not allow duplicate enrollment', async () => {
      // First enrollment
      await request(app)
        .post(`/api/courses/${courseId}/enroll`)
        .set('Cookie', studentAuthToken);
      
      // Second enrollment attempt
      const res = await request(app)
        .post(`/api/courses/${courseId}/enroll`)
        .set('Cookie', studentAuthToken);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Already enrolled in this course');
    });
  });
});
