const cartItem = require('./cartItem') //ok
const orderDetails = require('./orderDetails') //ok
const orderItems = require('./orderItems') //ok
const product = require('./product') 
const shoppingSession = require('./shoppingSession') //ok
const user = require('./user')
const userAddress = require('./userAddress') //ok

//a shoppingSession has 1 sessionID
cartItem.belongsTo(shoppingSession, { foreignKey: 'sessionID' })
shoppingSession.hasOne(cartItem, { foreignKey: 'idShopping' })

//a product can be in many baskets
cartItem.belongsTo(product, { foreignKey: 'productID' })
product.hasMany(cartItem, { foreignKey: 'idProduct' })


//an orderDetails is for 1 user
orderDetails.belongsTo(user, { foreignKey: 'userID' })
user.hasOne(orderDetails, { foreignKey: 'idUser' })


//an orderItems has one orderDetails
orderItems.belongsTo(orderDetails, { foreignKey: 'orderDetailsID' })
orderDetails.hasOne(orderItems, { foreignKey: 'idOrderDetails' })

//an orderItems has one product
orderItems.belongsTo(product, { foreignKey: 'productID' })
product.hasMany(orderItems, { foreignKey: 'idProduct' })


//a userAddress has one user
userAddress.belongsTo(user, { foreignKey: 'userID' })
user.hasMany(userAddress, { foreignKey: 'idUser'})