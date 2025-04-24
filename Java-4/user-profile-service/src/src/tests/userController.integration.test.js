const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('../controllers/userController');
const UserService = require('../services/userService');

// Mock the UserService
jest.mock('../services/userService');

// Create an express app for testing
const app = express();
app.use(bodyParser.json());

// Middleware to simulate authentication by extracting user ID from header
app.use((req, res, next) => {
  req.userId = req.headers['x-user-id'];
  next();
});

// Routes
app.post('/register', UserController.register);
app.get('/me', UserController.getCurrentUser);
app.get('/users/:id', UserController.getUserById);
app.put('/users/:id', UserController.updateUser);

describe('UserController Integration Tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('POST /register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com'
      };
      UserService.registerUser.mockResolvedValue(mockUser);

      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockUser);
      expect(UserService.registerUser).toHaveBeenCalledWith(userData);
    });

    it('should return 400 for invalid registration data', async () => {
      const errorMessage = 'Invalid email format';
      UserService.registerUser.mockRejectedValue(new Error(errorMessage));

      const invalidUserData = {
        username: 'testuser',
        email: 'invalid-email',
        password: 'password123'
      };

      const response = await request(app)
        .post('/register')
        .send(invalidUserData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: errorMessage });
      expect(UserService.registerUser).toHaveBeenCalledWith(invalidUserData);
    });
  });

  describe('GET /me', () => {
    it('should return the current user details', async () => {
      const mockUser = {
        id: 1,
        username: 'currentuser',
        email: 'current@example.com'
      };
      UserService.getUserById.mockResolvedValue(mockUser);

      const response = await request(app)
        .get('/me')
        .set('X-User-Id', '1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
      expect(UserService.getUserById).toHaveBeenCalledWith('1');
    });

    it('should return 404 when user not found', async () => {
      const errorMessage = 'User not found';
      UserService.getUserById.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .get('/me')
        .set('X-User-Id', '999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: errorMessage });
      expect(UserService.getUserById).toHaveBeenCalledWith('999');
    });
  });

  describe('GET /users/:id', () => {
    it('should return user details by ID', async () => {
      const mockUser = {
        id: 2,
        username: 'otheruser',
        email: 'other@example.com'
      };
      UserService.getUserById.mockResolvedValue(mockUser);

      const response = await request(app).get('/users/2');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
      expect(UserService.getUserById).toHaveBeenCalledWith('2');
    });

    it('should return 404 for non-existent user', async () => {
      const errorMessage = 'User not found';
      UserService.getUserById.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/users/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: errorMessage });
      expect(UserService.getUserById).toHaveBeenCalledWith('999');
    });
  });

  describe('PUT /users/:id', () => {
    it('should update user details successfully', async () => {
      const updatedUser = {
        id: 1,
        username: 'updateduser',
        email: 'updated@example.com'
      };
      UserService.updateUser.mockResolvedValue(updatedUser);

      const updateData = {
        username: 'updateduser',
        email: 'updated@example.com'
      };

      const response = await request(app)
        .put('/users/1')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedUser);
      expect(UserService.updateUser).toHaveBeenCalledWith('1', updateData);
    });

    it('should return 400 for invalid update data', async () => {
      const errorMessage = 'Email already in use';
      UserService.updateUser.mockRejectedValue(new Error(errorMessage));

      const invalidUpdateData = {
        email: 'existing@example.com'
      };

      const response = await request(app)
        .put('/users/1')
        .send(invalidUpdateData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: errorMessage });
      expect(UserService.updateUser).toHaveBeenCalledWith('1', invalidUpdateData);
    });
  });
});
