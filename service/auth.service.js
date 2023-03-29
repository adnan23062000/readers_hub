const UserService = require('./user.service');

module.exports = {

  registerUser: async (data) => UserService.createUser(data),

  userLogin: async (username) => {
    const user = await UserService.getUserByUsername(username, true);

    return user;
  },

};
