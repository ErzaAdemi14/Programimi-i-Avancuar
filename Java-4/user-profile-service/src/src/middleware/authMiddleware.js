const jwt = require('jsonwebtoken');

// Middleware to authenticate user based on JWT token
const authenticate = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return an error
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'artina');

    // Attach the decoded user data to the request object
    req.userId = decoded.userId; // Make sure the token includes `userId` in its payload

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // Handle specific error for expired token
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }

    // For other errors (invalid token, malformed token, etc.)
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;