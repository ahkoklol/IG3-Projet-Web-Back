const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getAllProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Get product by name
router.get('/name/:name', productController.getProductByName);

// Create a new product
router.post('/', productController.createProduct);

// Update a product by ID
router.put('/:id', productController.updateProductById);

// Delete a product by ID
router.delete('/:id', productController.deleteProductById);

module.exports = router;