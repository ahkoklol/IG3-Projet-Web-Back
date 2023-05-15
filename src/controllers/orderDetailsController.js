const OrderDetails = require("../models/orderDetails");


// get order details
exports.getOrderDetailsById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const orderDetails = await OrderDetails.findByPk(id);
        res.json(orderDetails);
    } catch (error) {
        res.status(404).json({ error: "Order details not found" });
    }
};


// create order details
exports.createOrderDetails = async (req, res) => {
    const { userID, price } = req.body;
    console.log(userID, price);
    try {
        const newOrderDetails = await OrderDetails.create({
            userID: userID,
            price: price
        });
        res.status(201).json(newOrderDetails);
    } catch (error) {
        res.status(400).json({ error: "Cannot create order details" });
    }
};


// update order details
exports.updateOrderDetailsById = async (req, res) => {
    const { id, userID, price } = req.body;
    try {
        const orderDetails = await OrderDetails.findByPk(id);
        orderDetails.userID = userID;
        orderDetails.price = price;
        await orderDetails.save();
        res.status(201).json(orderDetails);
    } catch (error) {
        res.status(400).json({ error: "Cannot update order details" });
    }
};


// delete order details
exports.deleteOrderDetailsById = async (req, res) => {
    const { id } = req.params;
    try {
        await OrderDetails.destroy({
            where: {
                idOrderDetails: id
            }
        });
        res.status(201).json({ message: "Order details deleted" });
    } catch (error) {
        res.status(400).json({ error: "Cannot delete order details" });
    }
};