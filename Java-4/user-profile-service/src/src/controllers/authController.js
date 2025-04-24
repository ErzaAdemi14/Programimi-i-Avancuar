const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.loginUser(email, password);
      
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({ 
        token,
        userId: user.id
      });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
}

module.exports = AuthController;