//server config

const express = require("express")
const app = express()
const helmet = require("helmet")
const cors = require('cors')
const cookieParser = require("cookie-parser")

const exampleRoute = require("./routes/exampleRoute");
const cartItemRoutes = require("./routes/cartItemRoutes");
const orderDetailsRoutes = require("./routes/orderDetailsRoutes");
const orderItemsRoutes = require("./routes/orderItemsRoutes");
const productRoutes = require("./routes/productRoutes");
const shoppingSessionRoutes = require("./routes/shoppingSessionRoutes");
const userAddressRoutes = require("./routes/userAddressRoutes");
const userRoutes = require("./routes/userRoutes");

const database = require("./config/database")

const user = require('./models/user');

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
}

app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//main page
app.get("/", (req, res)=>{
    res.send("hello world")
});

//app.use("/example", exampleRoute)
app.use("/cartItem", cartItemRoutes)
app.use("/orderDetails", orderDetailsRoutes)
app.use("/orderItems", orderItemsRoutes)
app.use("/product", productRoutes)
app.use("/shoppingSession", shoppingSessionRoutes)
app.use("/userAddress", userAddressRoutes)
app.use("/user", userRoutes)

/*
//create user
app.post("/register", (req, res)=>{

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const password = req.body.password
    const email = req.body.email

    user.create({
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email
    }).then(user => {
        console.log('Created user', user.dataValues);
      }).catch(err => {
        console.error('Failed to create user', err);
      });
})


//login user
app.post("/login", (req, res)=>{

    const password = req.body.password
    const email = req.body.email

    database.query(
        "SELECT * FROM users WHERE username = ? AND password = ?", [ password, email], (err, result)=>{
            if(err){
                res.send({err: err})
            } else {
                if(result.length > 0){
                    res.send(result)
                } else {
                    res.send({message: "wrong username/password combination"})
                }
            }
        }
    )
})
*/
/*

app.get("/", (req, res)=>{
    let uptimeObj = {uptime: process.uptime()}
    let uptimeStr = JSON.stringify(uptimeObj)
    res.status(200).send(uptimeStr)
});

*/


module.exports = app;
