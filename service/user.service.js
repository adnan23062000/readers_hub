const UserDTO = require("../DTO/user.dto");
const { convertToLowerCase, generateHashedPassword } = require("../utils/user.utils");
const UserRepository = require("../repository/userSequelize.repository");

module.exports = {
    
    createUser: async (data) => {

        return await UserRepository.createUser(data.username.toLower, data.email, data.password);

    },


    updateUser: async (userName, password) => {
        
        password = generateHashedPassword(password);
        
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


    getUserByUsername: async (userName, showPassword) => {
        
        const user = await UserRepository.getUserByUsername(userName);

        if(!user)
            return user;
        
        
        const dataValuesArray = user.dataValues;
        const userDTO = new UserDTO(dataValuesArray, showPassword);
        
        return userDTO;
    
    },


    deleteUser: async (userName) => {
        
        const validUsername = convertToLowerCase(userName);
        return await UserRepository.deleteUser(validUsername);
    },
    


    userLogin: async (username) => {
        
        const user = await UserRepository.getUserByUsername(username);
        
        const dataValuesArray = user.dataValues;

        return dataValuesArray;
    }


};