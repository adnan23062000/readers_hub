const sequelize = require('../config/databaseSequelize');
const User = require('./user.model');
const Blog = require('./post.model');

User.hasMany(Blog, { foreignKey: 'username' });
Blog.belongsTo(User, { foreignKey: 'username' });

sequelize.sync()
  .then(() => {
    console.log('Database tables synchronized successfully.');
  })
  .catch((err) => {
    console.error('Error synchronizing database tables:', err);
  });