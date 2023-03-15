const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseSequelize');
const User = require('./user.model');

const Blog = sequelize.define('Blog', {
  
  blogId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
    },
  
  blogTitle: {
    type: DataTypes.STRING(120),
    allowNull: false,
    validate: {
      len: [1, 120]
    }
  },

  blogBody: {
    type: DataTypes.STRING(5000),
    allowNull: false,
    validate: {
      len: [1, 5000]
    }
  },

  author: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true,
    },
    references: {
      model: User,
      key: 'username'
    }
  },

  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});


Blog.sync()
  .then(() => {
    console.log('Blog table created successfully.');
  })
  .catch((err) => {
    console.error('Error creating blog table:', err);
  });
  

module.exports = Blog;
