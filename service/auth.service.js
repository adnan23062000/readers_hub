const UserRepository = require("../repository/userSequelize.repository");

module.exports = {

    registerUser: async (data) => {

        return await UserRepository.createUser(data.username, data.email, data.password);

    },

    userLogin: async (username) => {
        
        const user = await UserRepository.getUserByUsername(username);
        
        const dataValuesArray = user.dataValues;

        return dataValuesArray;
    }

}