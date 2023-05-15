const OrderItems = require('../models/orderItems');

// get all order items
const getAllOrderItems = async (req, res) => {
    try {
      const orderItems = await OrderItems.findAll();
  
      res.status(200).json(orderItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};


// get a single order item by ID
const getOrderItemById = async (req, res) => {
    try {
      const orderItem = await OrderItems.findByPk(req.params.id);
  
      if (!orderItem) {
        return res.status(404).json({ message: 'Order item not found' });
      }
  
      res.status(200).json(orderItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};


// create a new order item
const createOrderItem = async (req, res) => {
  try {
    const { OrderDetailsID, productID, quantity } = req.body;

    const orderItem = await OrderItems.create({
      OrderDetailsID,
      productID,
      quantity,
    });

    res.status(201).json(orderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// update an existing order item
const updateOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItems.findByPk(req.params.id);

    if (!orderItem) {
      return res.status(404).json({ message: 'Order item not found' });
    }

    const { OrderDetailsID, productID, quantity } = req.body;

    await orderItem.update({
      OrderDetailsID: OrderDetailsID || orderItem.OrderDetailsID,
      productID: productID || orderItem.productID,
      quantity: quantity || orderItem.quantity,
    });

    res.status(200).json(orderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// delete an order item by ID
const deleteOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItems.findByPk(req.params.id);

    if (!orderItem) {
      return res.status(404).json({ message: 'Order item not found' });
    }

    await orderItem.destroy();

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createOrderItem,
  getOrderItemById,
  getAllOrderItems,
  updateOrderItem,
  deleteOrderItem,
};