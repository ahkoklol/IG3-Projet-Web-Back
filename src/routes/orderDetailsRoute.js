const express = require('express');
const router = express.Router();
const orderDetailsController = require('../controllers/orderDetailsController');

// Get order details by ID
router.get('/:id', orderDetailsController.getOrderDetailsById);

// Post order details by ID
router.post('/', orderDetailsController.createOrderDetails);

// Update order details by ID
router.put('/:id', orderDetailsController.updateOrderDetailsById);

// Delete order details by ID
router.delete('/:id', orderDetailsController.deleteOrderDetailsById);

module.exports = router;