const UserDTO = require("../DTO/user.dto");
const { convertToLowerCase, generateUUID,  generateHashedPassword } = require("../utils/user.utils");
const UserRepository = require("../repository/userSequelize.repository");

module.exports = {
    
    createUser: async (data) => {
        
        return await UserRepository.createUser(data.userName, data.email, data.password);

    },


    updateUser: async (userName, password) => {
        
         //const updatedPassword = generateHashedPassword(body.password);
        // return await updateUserRepo(updatedPassword, userName);

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
        
        const dataValuesArray = user.dataValues;
        //console.log(dataValuesArray);
        const userDTO = new UserDTO(dataValuesArray);
        
        return userDTO;
    
    },


    deleteUser: async (userName) => {
        
        // const validUsername = await convertToLowerCase(userName);
        // return await deleteUserRepo(validUsername);

        return await UserRepository.deleteUser(userName);
    },


};