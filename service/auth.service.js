const UserService = require('../service/user.service');
const { compareHashedPassword, generateAccessToken } = require("../utils/userValidation.utils");

module.exports = {

    registerUser: async (userData) => {
        const user = await UserService.createUser(userData);
        const accessToken = generateAccessToken(user.username);
        return accessToken;
    },

    userLogin: async (username, password) => {  
        
        const user = await UserService.getUserWithPassword(username, true);

        if(!user)
            throw new Error("User not found");
        
        const passwordMatched = await compareHashedPassword(password, user.password);

        if(!passwordMatched){
            throw new Error("Incorrect Password");
        }

        let accessToken = generateAccessToken(username);
        
        return accessToken;
    }

}