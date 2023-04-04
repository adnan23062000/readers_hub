const { sequelize } = require('../config/databaseSequelize');
const User = require('./user.model');
const Blog = require('./blog.model');

User.hasMany(Blog, { foreignKey: { name: 'username', allowNull: false } });
Blog.belongsTo(User, { foreignKey: { name: 'username', allowNull: false} });

async function syncModels () {
  try {
    await sequelize.sync();
    console.log('synced successfully');
  }
  catch(error){
    console.log('sync failed'+error);
  }
}

module.exports = syncModels;