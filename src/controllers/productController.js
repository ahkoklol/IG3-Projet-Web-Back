const Product = require("../models/product");

// get all products
exports.getAllProducts = async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
};

// get specific product
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const product = await Product.findByPk(id, {
            
        });
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: "Product not found" });
    }
};

exports.getProductByName = async (req, res) => {
    const { name } = req.params;
    console.log(name);
    try {
        const product = await Product.findAll({
            where: {
                name: name
            }
        });
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: "Product not found" });
    }
};


// create product
exports.createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    console.log(name, description, price);
    try {
        const newProduct = await Product.create({
            name: name,
            description: description,
            price: price
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: "Cannot create product" });
    }
};


// update product
exports.updateProductById = async (req, res) => {
    const { id, name, description, price } = req.body;
    try {
        const product = await Product.findByPk(id);
        product.name = name;
        product.description = description;
        product.price = price;
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: "Cannot update product" });
    }
};


// delete product
exports.deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.destroy({
            where: {
                id: id
            }
        });
    res.status(201).json({ message: "Product deleted" });
    } catch (error) {
        res.status(400).json({ error: "Cannot delete product" });
    }
};





