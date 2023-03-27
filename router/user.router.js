const router = require('express').Router();
const {
  getUsers, updateUser, deleteUser, getUserByUsername,
} = require('../controller/user.controller');
const { isUserLoggedIn } = require('../middleware/auth.middleware');

router.route('/')
  .get(isUserLoggedIn, getUsers);

router.route('/:userName')
  .get(isUserLoggedIn, getUserByUsername)
  .put(isUserLoggedIn, updateUser)
  .delete(isUserLoggedIn, deleteUser);

module.exports = router;
