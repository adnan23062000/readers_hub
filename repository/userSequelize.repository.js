const User = require('../model/user.model');

// Get all users
const getAllUsers = async (offset, limit) => {
  
    try{
        const users = await User.findAll({ offset, limit });
        return users;
    }
    catch(err){
        console.error(err.stack);
        throw err;
    }
};

// Get user by username
const getUserByUsername = async (username) => {
  
    try{
        const user = await User.findOne({ where: { username } });
        return user;
    }
    catch(err){
        console.error(err.stack);
        throw err;
    }
};

// Create new user
const createUser = async (username, email, password) => {
  
    try{
        return await User.create({ username, email, password });
    }
    catch(err){
        console.error(err.stack);
        throw err;
    }
};

// Update user password by username
const updateUser = async (username, newPassword) => {
    
    try{
        const user = await User.update({ password: newPassword }, {
          where: {
            username: username
          }
        });

        return user;

      } 
      catch(err)
      {
        console.error(err.stack);
        throw err;
      }
};

// Delete user by username
const deleteUser = async (username) => {
  
    try{
        return await User.destroy({ where: {
            username: username
          }});
    }
    catch(error){
        console.error(error.stack);
        throw error;
    }
};




module.exports = {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};
