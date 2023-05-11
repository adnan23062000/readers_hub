const User = require('../model/user.model');

const getAllUsers = async (offset, limit) => {
  const { rows: users, count } = await User.findAndCountAll({
    order: [['updatedAt', 'DESC']],
    offset,
    limit,
  });

  return { users, count };
};

const getUserByUsername = async (username) => {
  const user = await User.findOne({ where: { username } });
  return user;
};

const createUser = async (username, email, password) => {
  return await User.create({ username, email, password });
};

const updateUser = async (username, password) => {
  const user = await User.update(
    { password },
    {
      where: {
        username,
      },
      individualHooks: true,
    }
  );
  return user;
};

const deleteUser = async (username) => {
  return await User.destroy({
    where: {
      username,
    },
  });
};

const getTotalUserCount = async () => {
  const count = await User.count();
  return count;
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  getTotalUserCount,
};
