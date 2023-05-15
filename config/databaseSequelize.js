const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: false,
});

// Test the connection to the database
async function connectToDB() {
  try{
    await sequelize.authenticate();
    console.log('db connection established');
  }
  catch(error){
    console.log(error);
  }
}

module.exports = { sequelize, connectToDB };
