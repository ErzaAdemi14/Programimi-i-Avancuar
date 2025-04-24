const UserController = require('../controllers/userController');
const UserService = require('../services/userService');

// Mock the UserService module
jest.mock('../services/userService');

describe('UserController', () => {
  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user and return 201 status', async () => {
      const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' };
      const mockRequest = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        }
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock the service response
      UserService.registerUser.mockResolvedValue(mockUser);

      await UserController.register(mockRequest, mockResponse);

      // Verify service was called with correct data
      expect(UserService.registerUser).toHaveBeenCalledWith(mockRequest.body);
      
      // Verify response status and data
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 400 status when registration fails', async () => {
      const mockRequest = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        }
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const errorMessage = 'Registration failed';

      // Mock the service to reject
      UserService.registerUser.mockRejectedValue(new Error(errorMessage));

      await UserController.register(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getCurrentUser', () => {
    it('should return current user data', async () => {
      const mockUser = { id: 1, username: 'currentuser' };
      const mockRequest = {
        userId: 1
      };
      const mockResponse = {
        json: jest.fn()
      };

      UserService.getUserById.mockResolvedValue(mockUser);

      await UserController.getCurrentUser(mockRequest, mockResponse);

      expect(UserService.getUserById).toHaveBeenCalledWith(mockRequest.userId);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 when user not found', async () => {
      const mockRequest = {
        userId: 999
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const errorMessage = 'User not found';

      UserService.getUserById.mockRejectedValue(new Error(errorMessage));

      await UserController.getCurrentUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getUserById', () => {
    it('should return user data by id', async () => {
      const mockUser = { id: 2, username: 'otheruser' };
      const mockRequest = {
        params: { id: 2 }
      };
      const mockResponse = {
        json: jest.fn()
      };

      UserService.getUserById.mockResolvedValue(mockUser);

      await UserController.getUserById(mockRequest, mockResponse);

      expect(UserService.getUserById).toHaveBeenCalledWith(mockRequest.params.id);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 when user not found', async () => {
      const mockRequest = {
        params: { id: 999 }
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const errorMessage = 'User not found';

      UserService.getUserById.mockRejectedValue(new Error(errorMessage));

      await UserController.getUserById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('updateUser', () => {
    it('should update user and return updated data', async () => {
      const mockUpdatedUser = { id: 1, username: 'updateduser' };
      const mockRequest = {
        params: { id: 1 },
        body: { username: 'updateduser' }
      };
      const mockResponse = {
        json: jest.fn()
      };

      UserService.updateUser.mockResolvedValue(mockUpdatedUser);

      await UserController.updateUser(mockRequest, mockResponse);

      expect(UserService.updateUser).toHaveBeenCalledWith(
        mockRequest.params.id,
        mockRequest.body
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it('should return 400 when update fails', async () => {
      const mockRequest = {
        params: { id: 1 },
        body: { username: 'invaliduser' }
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const errorMessage = 'Invalid data';

      UserService.updateUser.mockRejectedValue(new Error(errorMessage));

      await UserController.updateUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
