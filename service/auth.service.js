const UserRepository = require("../repository/userSequelize.repository");
const { convertToLowerCase } = require("../utils/user.utils");
const UserService = require("../service/user.service");

module.exports = {

    registerUser: async (data) => {

        const username = await convertToLowerCase(data.username);
        
        return await UserService.createUser(username, data.email, data.password);

    },

    userLogin: async (username) => {
        
        const user = await UserService.getUserWithPassword(username);

        return user;
    }

}