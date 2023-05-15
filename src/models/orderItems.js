const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const orderDetails = require('./orderDetails');
const product = require('./product');

const orderItems = sequelize.define('orderItems', {

    idOrderItems: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 

    OrderDetailsID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: orderDetails,
            key: 'idOrderDetails'
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

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

},


    {
    timestamps: false, // Empêche Sequelize de créer les colonnes createdAt et updatedAt
    freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    }


);

//an orderItems has one orderDetails
orderDetails.hasOne(orderItems, { foreignKey: 'idOrderDetails' })

//an orderItems has one product
product.hasMany(orderItems, { foreignKey: 'idProduct' })

module.exports = orderItems;