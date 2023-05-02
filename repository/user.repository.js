const User = require('../model/user.model');

const getAllUsers = async (offset, limit) => {
    const users = await User.findAll({ order: [['updatedAt', 'DESC']], offset, limit });
    return users;
};

const getUserByUsername = async (username) => {
    const user = await User.findOne({ where: { username } });
    return user;
};

const createUser = async (username, email, password) => {
    return await User.create({ username, email, password });
};

const updateUser = async (username, password) => {
    const user = await User.update({ password }, {
        where: {
            username
        },
        individualHooks: true,
    });
    return user;
};

const deleteUser = async (username) => {
    return await User.destroy({ where: {
        username
    }});
};



module.exports = {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};
