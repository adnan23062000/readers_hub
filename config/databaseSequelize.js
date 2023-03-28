const Sequelize = require('sequelize');

const sequelize = new Sequelize('readers_hub_sequelize', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

// Test the connection to the database
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
