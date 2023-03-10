const repositoryDB = require("../repository/createDb.repository");
const { getAllUsersRepo, getUserByUsernameRepo, createUserRepo, updateUserRepo, deleteUserRepo } = require("../repository/user.repository");
const UserDTO = require("../DTO/user.dto");
const { convertToLowerCase, generateUUID,  generateHashedPassword } = require("../utils/user.utils");
const UserService = require("../repository/userSequelize.repository");

module.exports = {
    
    createUser: async (data) => {
        
        // const uuid = generateUUID();
        // return await createUserRepo(uuid, data);

        return await UserService.createUser(data.userName, data.email, data.password);


    },


    updateUser: async (userName, password) => {
        
         //const updatedPassword = generateHashedPassword(body.password);
        // return await updateUserRepo(updatedPassword, userName);

        return await UserService.updateUser(userName, password);

    },


    getAllUsers: async () => {
        
        // const users  = await getAllUsersRepo();
        // const userDTO = new UserDTO(users[0]);
        
        // return userDTO;

        const users = await UserService.getAllUsers();
        return users;
    },


    getUserByUsername: async (userName) => {
        
        // const validUsername = await convertToLowerCase(userName);
        // const users = await getUserByUsernameRepo(validUsername);
        // console.log(users);
        // const userDTO = new UserDTO(users[0]);

        // return userDTO;

        const user = await UserService.getUserByUsername(userName);
        return user;
    
    },


    deleteUser: async (userName) => {
        
        // const validUsername = await convertToLowerCase(userName);
        // return await deleteUserRepo(validUsername);

        return await UserService.deleteUser(userName);
    },


};