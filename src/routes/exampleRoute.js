/*

const express = require("express")

const router = express.Router()

//read all products 
router.get("/", (req, res)=>{return res.status(200).send("product1, product2, product3")})

//read the product with the given id
router.get("/:id", (req, res)=>{
    let id = req.params.id
    if(!id || isNaN(id)){
        return res.status(400).send("please provide valid id")
    } 
    return res.status(200).send(`product which has the id: ${id}`)
})   

//post to create
router.post("/", (req, res)=>{
    let {name, description, price} = req.body
    if(!name || !description || !price) {
        return res.status(400).send("product information not valid")
    }
    return res.status(200).send(`product information created. information is: ${name} ${description} ${price}`)
})

//put to modify
router.put("/price/:id", (req, res)=> {
    let id = req.params.id
    let price = req.body.price
    if(!id || !price || isNaN(id) || isNaN(price)){
        return res.status(400).send("check all criteria")
    }
    return res.status(200).send(`product price modified, id and price are: ${id} ${price}`)
})

//delete to delete
router.delete("/:id", (req, res)=> {
    let id = req.params.id
    if(!id || isNaN(id) ){
        return res.status(400).send("invalid id")
    }
    return res.status(200).send(`product name deleted, id was: ${id}`)
})

module.exports = router

*/