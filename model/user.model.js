const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/databaseSequelize')
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  
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
    unique: {
      args: true,
      msg: 'user already exists'
    },
    validate: {
      isAlphanumeric: {
        msg: "Invalid username"
      },
    },
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      arg: true,
      msg: 'Email already exists'
    },
    validate: {
      isEmail: {
        msg: "not an email"
      },
      
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, ], 
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
            const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
            const encryptedPassword = bcrypt.hashSync(User.password, salt);
            User.password = encryptedPassword;
          }
        },
        beforeUpdate: async(User) => {
          if (User.changed('password')) {
            const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
            const encryptedPassword = bcrypt.hashSync(User.password, salt);
            User.password = encryptedPassword;
          }
        }
      }
});


// User.sync()
//   .then(() => {
//     console.log('User table created successfully.');
//   })
//   .catch((err) => {
//     console.error('Error creating user table:', err);
//   });
  

module.exports = User;
