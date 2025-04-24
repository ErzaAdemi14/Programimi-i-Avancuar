const validator = require('validator');

const validateUserInput = (userData) => {
  if (!userData.email || !validator.isEmail(userData.email)) {
    throw new Error('Invalid email address');
  }

  if (!userData.password || userData.password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  if (!userData.name || userData.name.trim().length === 0) {
    throw new Error('Name is required');
  }
};

module.exports = {
  validateUserInput
};