const UserService = require('../service/user.service');
const { compareHashedPassword } = require("../utils/userValidation.utils");

module.exports = {

    registerUser: async (userData) => {
        return await UserService.createUser(userData);
    },

    userLogin: async (username) => {  
        const user = await UserService.getUserWithPassword(username, true);
        return user;
    }

}