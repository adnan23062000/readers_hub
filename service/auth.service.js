const UserRepository = require("../repository/userSequelize.repository");
const { convertToLowerCase } = require("../utils/user.utils");

module.exports = {

    registerUser: async (data) => {

        const username = await convertToLowerCase(data.username);

        return await UserRepository.createUser(username, data.email, data.password);

    },

    userLogin: async (username) => {
        
        const user = await UserRepository.getUserByUsername(username);
        
        const dataValuesArray = user.dataValues;

        return dataValuesArray;
    }

}