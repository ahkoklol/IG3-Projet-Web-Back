const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cartItemController');

// Get all cart items
router.get('/', cartItemController.getAllCartItems);

// Get cart item by ID
router.get('/:id', cartItemController.getCartItemById);

// Create new cart item
router.post('/', cartItemController.createCartItem);

// Update cart item by ID
router.put('/:id', cartItemController.updateCartItemById);

// Delete cart item by ID
router.delete('/:id', cartItemController.deleteCartItemById);

module.exports = router;