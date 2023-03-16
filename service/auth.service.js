const { convertToLowerCase } = require("../utils/user.utils");
const userService = require("./user.service");


module.exports = {

    registerUser: async (data) => {

        const username = await convertToLowerCase(data.username);

        return await userService.createUser(username, data.email, data.password);

    },

    userLogin: async (username) => {
        
        const user = await userService.getUserWithPassword(username);

        return user;
    }

}