const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');


module.exports = {

    convertToLowerCase: async (userName) => {
        const ans = userName.toLowerCase();
        return ans;
    },


    generateUUID:  () => {
        const myUuid = uuidv4();
        console.log(myUuid);
        return myUuid;
    },

    generateHashedPassword: (rawPassword) => {
        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(rawPassword, salt);
        
        return encryptedPassword;
    },

    checkParamValidity: (parameter) => {
        if(parameter.includes(" ")){
            return false;
        }
        return true;   
    },

    compareHashedPassword: async (rawPassword, encryptedPassword) => {
        
        const result = await bcrypt.compare(rawPassword, encryptedPassword);
        return result;

    },

    generateAccessToken:  (username) => {
        
        return jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        });
    }

}