const repositoryDB = require("../repository/createDb.repository");
const { getAllUsersRepo, getUserByUsernameRepo, createUserRepo, updateUserRepo, deleteUserRepo } = require("../repository/user.repository");
const UserDTO = require("../DTO/user.dto");
const { convertToLowerCase, generateUUID,  generateHashedPassword } = require("../utils/user.utils");

module.exports = {
    
    createUser: async (data) => {
        
        const uuid = generateUUID();
        return await createUserRepo(uuid, data);
    },


    updateUser: async (userName, body) => {
        
        const updatedPassword = generateHashedPassword(body.password);
        return await updateUserRepo(updatedPassword, userName);
    },


    getAllUsers: async () => {
        
        const users  = await getAllUsersRepo();
        const userDTO = new UserDTO(users[0]);
        
        return userDTO;
    },


    getUserByUsername: async (userName) => {
        
        const validUsername = await convertToLowerCase(userName);
        const users = await getUserByUsernameRepo(validUsername);
        console.log(users);
        const userDTO = new UserDTO(users[0]);

        return userDTO;
    
    },


    deleteUser: async (userName) => {
        const validUsername = await convertToLowerCase(userName);
        return await deleteUserRepo(validUsername);
    },


};