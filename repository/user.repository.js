const User = require('../model/user.model');


const getAllUsers = async (offset, limit) => {
  
    try{
        const users = await User.findAll({ offset, limit });
        return users;
    }
    catch(err){
        throw err;
    }
};

const getUserByUsername = async (username) => {
  
    try{
        const user = await User.findOne({ where: { username } });
        return user;
    }
    catch(err){
        throw err;
    }
};

const createUser = async (username, email, password) => {
  
    try{
        return await User.create({ username, email, password });
    }
    catch(err){
        throw err;
    }
};

const updateUser = async (username, password) => {
    
    try{
        const user = await User.update({ password }, {
          where: {
            username
          },
          individualHooks: true,
        });
        return user;
      } 
      catch(err)
      {
        throw err;
      }
};

const deleteUser = async (username) => {
  
    try{
        return await User.destroy({ where: {
            username
          }});
    }
    catch(error){
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
