const UserDTO = require("../DTO/user.dto");
const { convertToLowerCase, generateHashedPassword } = require("../utils/userValidation.utils");
const { calculateOffset } = require('../utils/pagination.utils');
const UserRepository = require("../repository/user.repository");

module.exports = {
    
    createUser: async (userData) => {
        return await UserRepository.createUser(userData.username, userData.email, userData.password);
    },


    updateUser: async (username, password) => {
        password = generateHashedPassword(password); 
        return await UserRepository.updateUser(username, password);
    },


    getAllUsers: async (page, limit) => {
        
        const pageStart = calculateOffset(page, limit);

        const users = await UserRepository.getAllUsers(parseInt(pageStart), parseInt(limit));
        
        const usersList = [];
        const dataValuesArray = users.map(user => user.dataValues);

        dataValuesArray.forEach(dataValue => {
            const userDTO = new UserDTO(dataValue);
            usersList.push(userDTO);
        });

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
        
        const validUsername = convertToLowerCase(userName);
        return await UserRepository.deleteUser(validUsername);
    }

};