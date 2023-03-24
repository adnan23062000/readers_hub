const sequelize = require('../config/databaseSequelize');
const User = require('./user.model');
const Blog = require('./blog.model');

User.hasMany(Blog, { foreignKey: { name: 'username', allowNull: false } });
Blog.belongsTo(User, { foreignKey: { name: 'username', allowNull: false} });

sequelize.sync()
  .then(() => {
    console.log('Database tables synchronized successfully.');
  })
  .catch((err) => {
    console.error('Error synchronizing database tables:', err);
  });