const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');


module.exports = {

    convertToLowerCase: (userName) => {
        const ans = userName.toLowerCase();
        return ans;
    },

    generateUUID:  () => {
        const myUuid = uuidv4();
        return myUuid;
    },

    generateHashedPassword: (rawPassword) => {
        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(rawPassword, salt);
        
        return encryptedPassword;
    },

    isParamValid: (parameter) => {
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
            algorithm: process.env.ACCESS_TOKEN_ALGORITHM,
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        });
    },

    checkPasswordLength: (password) => {
        if(password.length<6){
            return false;
        }
        return true;
    },

    isNumeric: (str) => {
        return /^\d+$/.test(str);
    }

}