const pool = require("../config/database");
const repositoryDB = require("../repository/createDb.repository");
const { getAllUsersRepo, getUserByUsernameRepo, createUserRepo, updateUserRepo, deleteUserRepo } = require("../repository/user.repository");
const UserDTO = require("../DTO/user.dto");
const { v4: uuidv4 } = require('uuid');
const { convertToLowerCase, generateUUID,  generateHashedPassword } = require("../utils/user.utils");

module.exports = {
    
    createUserService: async (data) => {
        
        const uuid = generateUUID();
        return await createUserRepo(uuid, data);
    },


    updateUserService: async (userName, body) => {
        
        const updatedPassword = generateHashedPassword(body.password);
        return await updateUserRepo(updatedPassword, userName);
    },


    getAllUsersService: async () => {
        
        const users  = await getAllUsersRepo();
        const userDTO = new UserDTO(users[0]);
        
        return userDTO;
    },


    getUserByUsernameService: async (userName) => {
        
        const validUsername = await convertToLowerCase(userName);
        const users = await getUserByUsernameRepo(validUsername);
        const userDTO = new UserDTO(users[0]);

        return userDTO;
    
    },


    deleteUserService: async (userName) => {
        const validUsername = await convertToLowerCase(userName);
        return await deleteUserRepo(validUsername);
    },


    deleteUser: (userName, callBack) => {
        pool.query(`delete from user where Username = ?`,
        [userName.toLowerCase()],
        (error, results, fields) => {
            if(error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    }



};