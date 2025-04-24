const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const UserController = require('../controllers/userController');

router.post('/', UserController.register);
router.get('/me', authenticate, UserController.getCurrentUser);
router.get('/:id', authenticate, UserController.getUserById);
router.put('/:id', authenticate, UserController.updateUser);

module.exports = router;