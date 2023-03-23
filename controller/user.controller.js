const {
  getUserByUsername, updateUser, getAllUsers, deleteUser,
} = require('../service/user.service');
const { checkParamValidity, checkPasswordLength, convertToLowerCase } = require('../utils/user.utils');
const { contentNegotiate } = require('../utils/contentNegotiation.utils');
const { pagination } = require('../utils/pagination.utils');

module.exports = {

  getUserByUsername: async (req, res) => {
    const { userName } = req.params;

    if (!checkParamValidity(userName)) {
      return res.status(400).json({
        success: false,
        message: 'invalid request',
      });
    }

    try {
      const result = await getUserByUsername(userName);

      if (!result) {
        return res.status(404).json({
          success: false,
          data: 'user not found',
        });
      }

      const resultArray = [];
      resultArray.push(result);
      contentNegotiate(req, res, resultArray);
    } catch (error) {
      console.log(error);
    }

    return null;
  },

  getUsers: async (req, res) => {
    const paginationAttr = pagination(req.query.page, req.query.limit);

    try {
      const results = await getAllUsers(paginationAttr.page, paginationAttr.limit);
      contentNegotiate(req, res, results);
    } catch (error) {
      console.log(error);
    }
  },

  updateUser: async (req, res) => {
    const { body } = req;

    const { userName } = req.params;

    if (!checkParamValidity(userName)) {
      return res.status(400).json({
        success: false,
        message: 'invalid username',
      });
    }

    if (!checkPasswordLength(body.password)) {
      return res.status(400).json({
        success: false,
        message: 'password length too small',
      });
    }

    try {
      const result = await updateUser(convertToLowerCase(userName), body.password);
      if (result) {
        return res.status(200).json({
          success: true,
          data: 'user updated successfully',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'user update failed',
      });
    }

    return null;
  },

  deleteUser: async (req, res) => {
    const { userName } = req.params;

    if (!checkParamValidity(userName)) {
      return res.status(400).json({
        message: 'invalid request',
      });
    }

    try {
      const result = await deleteUser(convertToLowerCase(userName));
      if (result) {
        return res.status(200).json({
          success: true,
          data: 'user deleted successfully',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'user deletion failed',
      });
    }

    return null;
  },

};
