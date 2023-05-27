const express = require('express');
const router = express.Router();
const shoppingSessionController = require('../controllers/shoppingSessionController');

// Get a single shopping session by ID
router.get('/:id', shoppingSessionController.getShoppingSessionById);

// Create a new shopping session
router.post('/', shoppingSessionController.createShoppingSession);

// Update a shopping session
router.put('/:id', shoppingSessionController.updateShoppingSession);

// Delete a shopping session
router.delete('/:id', shoppingSessionController.deleteShoppingSession);

module.exports = router;