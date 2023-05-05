const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const product = sequelize.define('product', {

    idProduct: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
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

module.exports = product;