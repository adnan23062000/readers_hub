const Sequelize = require('sequelize')

const sequelize = new Sequelize('readers_hub_sequelize', 'root', '', {
  host: 'localhost',
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
