//server config

const express = require("express")
const app = express()
const helmet = require("helmet")

const exampleRoute = require("./routes/exampleRoute");
const carItemRoutes = require("./routes/carItemRoutes");
const orderDetailsRoutes = require("./routes/orderDetailsRoutes");
const orderItemsRoutes = require("./routes/orderItemsRoutes");
const productRoutes = require("./routes/productRoutes");
const shoppingSessionRoutes = require("./routes/shoppingSessionRoutes");
const userAddressRoutes = require("./routes/userAddressRoutes");
const userRoutes = require("./routes/userRoutes");

app.get("/", (req, res)=>{
    res.send("hello world")
});

//app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//app.use("/example", exampleRoute)
app.use("/carItem", carItemRoutes)
app.use("/orderDetails", orderDetailsRoutes)
app.use("/orderItems", orderItemsRoutes)
app.use("/product", productRoutes)
app.use("/shoppingSession", shoppingSessionRoutes)
app.use("/userAddress", userAddressRoutes)
app.use("/user", userRoutes)

/*

app.get("/", (req, res)=>{
    let uptimeObj = {uptime: process.uptime()}
    let uptimeStr = JSON.stringify(uptimeObj)
    res.status(200).send(uptimeStr)
});

*/


module.exports = app;
