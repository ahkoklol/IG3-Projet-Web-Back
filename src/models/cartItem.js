const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const shoppingSession = require('./shoppingSession');
const product = require('./product');

const cartItem = sequelize.define('cartItem', {

    idCart: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 

    sessionID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: shoppingSession,
             key: 'idShopping'
        }
    },

    productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: product,
            key: 'idProduct'
        }
    },
},


    {
    timestamps: false, // Empêche Sequelize de créer les colonnes createdAt et updatedAt
    freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    }


);

//a shoppingSession has 1 cart
shoppingSession.hasOne(cartItem, { foreignKey: 'idShopping' })

//a product can be in many baskets
product.hasMany(cartItem, { foreignKey: 'idProduct' })

module.exports = cartItem;