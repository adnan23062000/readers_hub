const { getUsers, updateUser, deleteUser, getUserByUsername, userLogin, userRegister } = require("../controller/user.controller");
const { verify } = require('../middleware/auth.middleware');

const router = require("express").Router();

router.route('/')
    .get(verify, getUsers)


router.route('/:userName')
    .get(verify, getUserByUsername)
    .put(verify, updateUser)
    .delete(verify, deleteUser)



module.exports = router;
