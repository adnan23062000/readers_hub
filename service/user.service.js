const UserDTO = require('../DTO/user.dto');
const { convertToLowerCase, generateHashedPassword } = require('../utils/user.utils');
const { getStartingSerial } = require('../utils/pagination.utils');
const UserRepository = require('../repository/userSequelize.repository');

module.exports = {

  createUser: async (data) => UserRepository.createUser(data.username, data.email, data.password),

  updateUser: async (userName, password) => UserRepository.updateUser(userName, generateHashedPassword(password)),

  getAllUsers: async (page, limit) => {
    const pageStart = getStartingSerial(page, limit);

    const users = await UserRepository.getAllUsers(parseInt(pageStart, 10), parseInt(limit, 10));

    const usersList = [];

    const dataValuesArray = users.map((user) => user.dataValues);

    for (let i = 0; i < dataValuesArray.length; i += 1) {
      const userDTO = new UserDTO(dataValuesArray[i]);
      usersList.push(userDTO);
    }

    return usersList;
  },

  getUserByUsername: async (userName, showPassword) => {
    const user = await UserRepository.getUserByUsername(userName);

    if (!user) { return user; }

    const dataValuesArray = user.dataValues;
    const userDTO = new UserDTO(dataValuesArray, showPassword);

    return userDTO;
  },

  deleteUser: async (userName) => {
    const validUsername = convertToLowerCase(userName);
    return UserRepository.deleteUser(validUsername);
  },

  userLogin: async (username) => {
    const user = await UserRepository.getUserByUsername(username);

    const dataValuesArray = user.dataValues;

    return dataValuesArray;
  },

};
