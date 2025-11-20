import request from 'supertest';
import app from '../../backend/server.js';
import mongoose from 'mongoose';
import User from '../../backend/models/User.js';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'testpassword123',
  role: 'student'
};

describe('Authentication API', () => {
  // Connect to a test database before running tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Clear the test database after each test
  afterEach(async () => {
    await User.deleteMany({});
  });

  // Close the database connection after all tests are done
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/auth/register/student', () => {
    it('should register a new student user', async () => {
      const res = await request(app)
        .post('/api/auth/register/student')
        .send({
          name: testUser.name,
          email: testUser.email,
          password: testUser.password,
          acceptTerms: true
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', testUser.name);
      expect(res.body).toHaveProperty('email', testUser.email);
      expect(res.body).toHaveProperty('role', testUser.role);
      expect(res.body).not.toHaveProperty('password');
    });

    it('should not register a user with an existing email', async () => {
      // First, create a user
      await User.create(testUser);

      // Try to create another user with the same email
      const res = await request(app)
        .post('/api/auth/register/student')
        .send({
          name: 'Another User',
          email: testUser.email,
          password: 'anotherpassword',
          acceptTerms: true
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'User already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a user before each test
      const user = new User(testUser);
      await user.save();
    });

    it('should login a user with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      expect(res.statusCode).toEqual(200);
      expect(res.headers['set-cookie']).toBeDefined();
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', testUser.name);
      expect(res.body).toHaveProperty('email', testUser.email);
    });

    it('should not login with invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Invalid email or password');
    });
  });

  describe('GET /api/auth/me', () => {
    let authToken;
    
    beforeEach(async () => {
      // Create and login a user before each test
      const user = new User(testUser);
      await user.save();
      
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });
      
      // Get the auth token from the response cookies
      const cookie = loginRes.headers['set-cookie'][0];
      authToken = cookie.split(';')[0];
    });

    it('should get the current user profile', async () => {
      const res = await request(app)
        .get('/api/auth/me/student')
        .set('Cookie', authToken);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('email', testUser.email);
    });

    it('should not get profile without authentication', async () => {
      const res = await request(app)
        .get('/api/auth/me/student');

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Not authorized, no token');
    });
  });
});
