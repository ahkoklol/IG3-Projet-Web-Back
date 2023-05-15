const express = require('express');
const router = express.Router();

const userAddressController = require('../controllers/userAddressController');

// create user address
router.post('/', userAddressController.createUserAddress);

// get user address by ID
router.get('/:id', userAddressController.getUserAddressById);

// get user addresses by userID
router.get('/user/:userID', userAddressController.getUserAddressesByUserId);

// update user address by ID
router.put('/:id', userAddressController.updateUserAddressById);

// delete user address by ID
router.delete('/:id', userAddressController.deleteUserAddressById);

module.exports = router;