const { Sequelize } = require('sequelize');

//const postgrePassword = require('../credentials.js')
require('dotenv').config()
//console.log(process.env.DATABASE_URL)

/*
const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    logging: false,
  }
*/


const sequelize = new Sequelize(
  process.env.PG_NAME,
  process.env.PG_USERNAME,
  process.env.PG_PASSWORD,
  {
      host: process.env.PG_HOST,
      dialect: "postgres",
      dialectOptions: {
          ssl: {
              require: true,
              rejectUnauthorized: false
          }
      },
      port: process.env.PG_PORT,
      logging: false
  }
  
);

/*

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  ssl: true, // Enable SSL for secure connection (assuming you have an SSL certificate)
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Avoids self-signed certificate rejection error
    }
  }
});

*/


module.exports = sequelize;