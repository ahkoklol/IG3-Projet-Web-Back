const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const user = require('./user');

const userAddress = sequelize.define('userAddress', {

    idAddress: {
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

    descriptionaddressLine1: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    descriptionaddressLine2: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    postalCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    telephone: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    mobile: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

},


    {
    timestamps: false, // Empêche Sequelize de créer les colonnes createdAt et updatedAt
    freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    }


);

//a userAddress has one user
user.hasMany(userAddress, { foreignKey: 'idUser'})

module.exports = userAddress;