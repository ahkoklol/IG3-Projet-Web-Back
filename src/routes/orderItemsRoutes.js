const express = require('express');
const router = express.Router();
const orderItemsController = require('../controllers/orderItemsController');

// GET all order items
router.get('/', orderItemsController.getAllOrderItems);

// GET single order item by ID
router.get('/:id', orderItemsController.getOrderItemById);

// POST create a new order item
router.post('/', orderItemsController.createOrderItem);

// PUT update an existing order item
router.put('/:id', orderItemsController.updateOrderItem);

// DELETE an order item by ID
router.delete('/:id', orderItemsController.deleteOrderItem);

module.exports = router;