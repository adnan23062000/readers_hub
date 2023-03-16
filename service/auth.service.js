const UserRepository = require("../repository/userSequelize.repository");
const { convertToLowerCase } = require("../utils/user.utils");
const UserService = require("../service/user.service");

module.exports = {

    registerUser: async (user) => {

        user.username = convertToLowerCase(user.username);
        
        return await UserService.createUser(user);

    },

    userLogin: async (username) => {
        
        const user = await UserService.getUserByUsername(username, true);

        //console.log(user);

        return user;
    }

}