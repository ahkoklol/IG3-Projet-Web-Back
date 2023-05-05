const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const user = require('./user');

const orderDetails = sequelize.define('orderDetails', {

    idOrderDetails: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 

    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'idUser'
        }
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

},


    {
    timestamps: false, // Empêche Sequelize de créer les colonnes createdAt et updatedAt
    freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    }


);

module.exports = orderDetails;