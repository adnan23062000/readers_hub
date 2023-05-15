const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.MYSQL_DB, 'test_explaintea', 'cf5328d399b6a325e9dfdbcbaad80dc87a33bd28', {
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
