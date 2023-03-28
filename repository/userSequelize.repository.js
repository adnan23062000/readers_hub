const User = require('../model/user.model');

// Get all users
const getAllUsers = async () => {
  
    try{
        const users = await User.findAll();
        return users;
    }
    catch(err){
        console.log(err.stack);
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
        console.log(err.stack);
        throw err;
    }
};

// Create new user
const createUser = async (username, email, password) => {
  
    try{
        return await User.create({ username, email, password });
    }
    catch(err){
        console.log(err.stack);
        throw err;
    }
};

// Update user password by username
const updateUser = async (username, password) => {
    
    try{
        const user = await User.update({ password }, {
          where: {
            username
          }
        });

        return user;

      } 
      catch(err)
      {
        console.log(err.stack);
        throw err;
      }
};

// Delete user by username
const deleteUser = async (username) => {
  
    try{
        return await User.destroy({ where: {
            username
          }});
    }
    catch(error){
        console.log(error.stack);
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
