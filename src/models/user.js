const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const user = sequelize.define('user', {

    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    /*
    telephone: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    */

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    admin_level: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
          max: 2,
        },
    },

},

    {
    timestamps: false, // Empêche Sequelize de créer les colonnes createdAt et updatedAt
    freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    }


);

module.exports = user;