const UserDTO = require("../DTO/user.dto");
const { getUsersList } = require('../utils/dtoDataList.utils');
const { calculateOffset } = require('../utils/pagination.utils');
const UserRepository = require("../repository/user.repository");

module.exports = {
    
    createUser: async (userData) => {
        return await UserRepository.createUser(userData.username, userData.email, userData.password);
    },


    updateUser: async (username, password) => {
        return await UserRepository.updateUser(username, password);
    },


    getAllUsers: async (page, limit) => {
        
        const pageStart = calculateOffset(page, limit);

        const users = await UserRepository.getAllUsers(parseInt(pageStart), parseInt(limit));
        const usersList = getUsersList(users);

        return usersList;
    },


    getUserByUsername: async (userName) => {
        
        const user = await UserRepository.getUserByUsername(userName);
        
        if(!user)
            return null;

        const userDTO = new UserDTO(user);
        return userDTO;
    
    },


    getUserWithPassword: async (userName, showPassword) => {
        
        const user = await UserRepository.getUserByUsername(userName);

        if(!user)
            return null;
        
        const dataValuesArray = user.dataValues;
        const userDTO = new UserDTO(dataValuesArray, showPassword);
        
        return userDTO;
    
    },


    deleteUser: async (userName) => {
        
        const validUsername = userName.toLowerCase();
        return await UserRepository.deleteUser(validUsername);
    }

};