const  { genSaltSync, hashSync } = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

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
        const salt = genSaltSync(10);
        const encryptedPassword = hashSync(rawPassword, salt);
        
        return encryptedPassword;
    }

}