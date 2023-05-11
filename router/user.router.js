const { getUsers, updateUser, deleteUser, getUserByUsername, getUserCount } = require("../controller/user.controller");
const { isUserLoggedIn } = require('../middleware/authentication.middleware');
const { isUserAuthorized } = require('../middleware/userAuthorization.middleware');

const router = require("express").Router();

router.route('/')
    .get(getUsers)

router.route('/:userName')
    .get(getUserByUsername)
    .put(isUserLoggedIn, isUserAuthorized, updateUser)
    .delete(isUserLoggedIn, isUserAuthorized, deleteUser)

router.route('/totalUsers')
    .get(getUserCount)


module.exports = router;
