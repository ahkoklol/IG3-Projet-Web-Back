const CartItem = require('../models/cartItem');

// get all cart items
const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll();
    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// get cart item by ID
const getCartItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// create a new cart item
const createCartItem = async (req, res) => {
  const { sessionID, productID } = req.body;
  try {
    const cartItem = await CartItem.create({
      sessionID,
      productID,
    });
    res.json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// update cart item by ID
const updateCartItemById = async (req, res) => {
  const { id } = req.params;
  const { sessionID, productID } = req.body;
  try {
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    cartItem.sessionID = sessionID;
    cartItem.productID = productID;
    await cartItem.save();
    res.json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// delete cart item by ID
const deleteCartItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    await cartItem.destroy();
    res.json({ message: 'Cart item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllCartItems,
  getCartItemById,
  createCartItem,
  updateCartItemById,
  deleteCartItemById,
};