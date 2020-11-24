const Sequelize = require("sequelize");
const db = {};
require('dotenv').config();

const sequelize = new Sequelize("dbDataWarehouse", "root", "ejemplo_password", {
  dialect: "mysql",
  port: "3307", /////////ACLARAR EN README///////////////
  host: "127.0.0.1"
});

db.sequelize = sequelize;

sequelize.authenticate().then(()=>{
  console.log('Está conectado OK');
}).catch(err=>{
  console.log(err);
});

module.exports = db;

