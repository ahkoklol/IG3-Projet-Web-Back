const { Sequelize } = require('sequelize');

//const postgrePassword = require('../credentials.js')
require('dotenv').config()
const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false });


/*
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, postgrePassword, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})
*/



module.exports = sequelize;