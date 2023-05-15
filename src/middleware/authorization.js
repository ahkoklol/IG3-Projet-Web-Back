const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      // No authorization header provided
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];
    if (!token) {
      // No token provided
      return res.status(401).json({ message: 'Token missing' });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      // Invalid token
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Find the user associated with the token
    const user = await User.findByPk(decodedToken.userId);
    if (!user) {
      // User not found
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has the necessary role
    if (user.role !== 'admin') {
      // User doesn't have the necessary role
      return res.status(403).json({ message: 'Forbidden' });
    }

    // User is authorized, pass control to the next middleware or route handler
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = authMiddleware;