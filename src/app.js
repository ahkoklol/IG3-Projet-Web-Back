//server config

const express = require("express")

const helmet = require("helmet")

const productRoutes = require("./routes/productRoutes")

const app = express()

//app.use(helmet())

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use("/product", productRoutes)

app.get("/", (req, res)=>{
    let uptimeObj = {uptime: process.uptime()}
    let uptimeStr = JSON.stringify(uptimeObj)
    res.status(200).send(uptimeStr)
})



module.exports = app
