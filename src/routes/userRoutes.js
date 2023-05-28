const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authentification');
const {
  getUsers,
  getUserById,
  signUp,
  signIn,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Get all users
router.get('/', getUsers);

// Get user by ID
router.get('/:id', getUserById);

// Signup user
router.post('/register', signUp);

// Signin user
router.post('/login', signIn);

// Update user
router.put('/:id', updateUser);

// Delete user
router.delete('/:id', deleteUser);

module.exports = router;