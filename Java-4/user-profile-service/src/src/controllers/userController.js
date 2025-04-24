const UserService = require('../services/userService');

class UserController {
  // Register a new user
  static async register(req, res) {
    try {
      const newUser = await UserService.registerUser(req.body);
      res.status(201).json(newUser);  // Return the newly created user with a 201 status code
    } catch (err) {
      res.status(400).json({ error: err.message });  // Bad request if there is an error
    }
  }

  // Get current logged-in user's details
  static async getCurrentUser(req, res) {
    try {
      // Assumes userId is set in the request (e.g., via authentication middleware)
      const user = await UserService.getUserById(req.userId);
      res.json(user);  // Return the user data
    } catch (err) {
      res.status(404).json({ error: err.message });  // Not found if user doesn't exist
    }
  }

  // Get user by ID
  static async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.json(user);  // Return the user data
    } catch (err) {
      res.status(404).json({ error: err.message });  // Not found if user doesn't exist
    }
  }

  // Update user details
  static async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      res.json(updatedUser);  // Return the updated user data
    } catch (err) {
      res.status(400).json({ error: err.message });  // Bad request if there's an error
    }
  }
}

module.exports = UserController;
