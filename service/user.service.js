const UserDTO = require("../DTO/user.dto");
const { convertToLowerCase, generateUUID,  generateHashedPassword } = require("../utils/user.utils");
const UserRepository = require("../repository/userSequelize.repository");

module.exports = {
    
    createUser: async (username, email, password) => {

        return await UserRepository.createUser(username, email, password);

    },


    updateUser: async (userName, password) => {
        
        return await UserRepository.updateUser(userName, password);

    },


    getAllUsers: async () => {
        
        const users = await UserRepository.getAllUsers();
        
        const usersList = [];
        
        const dataValuesArray = users.map(user => user.dataValues);
        
        for (var i = 0; i < dataValuesArray.length; i++) {
            const userDTO = new UserDTO(dataValuesArray[i]);
            usersList.push(userDTO);
        }

        return usersList;
    },


    getUserByUsername: async (userName) => {
        
        const user = await UserRepository.getUserByUsername(userName);

        if(user===null || user===undefined)
            return user;
        
        
        const dataValuesArray = user.dataValues;
        const userDTO = new UserDTO(dataValuesArray);
        
        return userDTO;
    
    },


    getUserWithPassword: async (userName) => {
        
        const user = await UserRepository.getUserByUsername(userName);
        
        return user;
    
    },



    deleteUser: async (userName) => {
        
        const validUsername = await convertToLowerCase(userName);
        return await UserRepository.deleteUser(validUsername);
    },


    userLogin: async (username) => {
        
        const user = await UserRepository.getUserByUsername(username);
        
        const dataValuesArray = user.dataValues;

        return dataValuesArray;
    }


};