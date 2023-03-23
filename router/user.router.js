const router = require('express').Router();
const {
  getUsers, updateUser, deleteUser, getUserByUsername,
} = require('../controller/user.controller');
const { verify } = require('../middleware/auth.middleware');

router.route('/')
  .get(verify, getUsers);

router.route('/:userName')
  .get(verify, getUserByUsername)
  .put(verify, updateUser)
  .delete(verify, deleteUser);

module.exports = router;
