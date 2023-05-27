const http = require("http")

const app = require("./app")



const PORT = 8800;

//app.listen(PORT, ()=>{console.log(`the server is running on the address: http://localhost:${PORT}`)})


// Empêche le programme de crasher en production, car il n'y pas dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const sequelize = require('./config/database');

// Charge les modelels de la base de données pour que Sequelize puisse les synchroniser
require('./models/cartItem');
require('./models/orderDetails');
require('./models/orderItems');
require('./models/product');
require('./models/shoppingSession');
require('./models/user');
require('./models/userAddress');

(async () => {
  try {
    console.log('0')
      await sequelize.authenticate();
      console.log('1')
      await sequelize.sync(); //{force: true} to sync new tables to pgadmin
      console.log('Database connection established and models synced.');
      const server = http.createServer(app)

      app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
      });
  } catch (error) {
      console.error('Unable to connect to the database or sync models:', error);
  }
})();