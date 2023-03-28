const UserService = require('../service/user.service');

module.exports = {

    registerUser: async (data) => {
        return await UserService.createUser(data);
    },

    userLogin: async (username) => {  
        const user = await UserService.getUserWithPassword(username, true);
        return user;
    }

}