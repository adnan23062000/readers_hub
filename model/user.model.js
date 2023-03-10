const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseSequelize'); 

const User = sequelize.define('User', {
  
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 25],
    },
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
}, 

{
    timestamps: false,
});

// Sync the User model with the database
User.sync()
  .then(() => {
    console.log('User table created successfully.');
  })
  .catch((err) => {
    console.error('Error creating user table:', err);
  });

module.exports = User;
