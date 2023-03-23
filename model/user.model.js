const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/databaseSequelize');

const User = sequelize.define(
  'User',
  {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        isAlphanumeric: true,
      },
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
        len: [6],
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
    hooks: {
      beforeSave: async (User) => {
        if (User.changed('password')) {
          const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND, 10));
          const encryptedPassword = bcrypt.hashSync(User.password, salt);
          User.password = encryptedPassword;
        }
      },
    },
  },
);

User.sync()
  .then(() => {
    console.log('User table created successfully.');
  })
  .catch((err) => {
    console.error('Error creating user table:', err);
  });

module.exports = User;
