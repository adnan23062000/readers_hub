const { getUsers, updateUser, deleteUser, getUserByUsername } = require("../controller/user.controller");
const { isUserLoggedIn } = require('../middleware/authentication.middleware');

const router = require("express").Router();

router.route('/')
    .get(getUsers)


router.route('/:userName')
    .get(getUserByUsername)
    .put(isUserLoggedIn, updateUser)
    .delete(isUserLoggedIn, deleteUser)



module.exports = router;
