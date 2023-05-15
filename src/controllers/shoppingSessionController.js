const ShoppingSession = require('../models/shoppingSession');

// get a single shopping session by ID
exports.getShoppingSessionById = async (req, res) => {
    try {
      const shoppingSession = await ShoppingSession.findByPk(req.params.id);
  
      if (!shoppingSession) {
        return res.status(404).json({
          message: 'Shopping session not found',
        });
      }
  
      res.status(200).json({
        data: shoppingSession,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error getting shopping session',
        error: error.message,
      });
    }
};


// create a new shopping session
exports.createShoppingSession = async (req, res) => {
  try {
    const { userID, total } = req.body;

    const shoppingSession = await ShoppingSession.create({
      userID,
      total,
    });

    res.status(201).json({
      message: 'Shopping session created successfully',
      data: shoppingSession,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error creating shopping session',
      error: error.message,
    });
  }
};


// update a shopping session
exports.updateShoppingSession = async (req, res) => {
  try {
    const shoppingSession = await ShoppingSession.findByPk(req.params.id);

    if (!shoppingSession) {
      return res.status(404).json({
        message: 'Shopping session not found',
      });
    }

    await shoppingSession.update(req.body);

    res.status(200).json({
      message: 'Shopping session updated successfully',
      data: shoppingSession,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error updating shopping session',
      error: error.message,
    });
  }
};


// delete a shopping session
exports.deleteShoppingSession = async (req, res) => {
  try {
    const shoppingSession = await ShoppingSession.findByPk(req.params.id);

    if (!shoppingSession) {
      return res.status(404).json({
        message: 'Shopping session not found',
      });
    }

    await shoppingSession.destroy();

    res.status(200).json({
      message: 'Shopping session deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error deleting shopping session',
      error: error.message,
    });
  }
};