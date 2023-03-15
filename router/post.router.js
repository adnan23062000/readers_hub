const { getUsers, updateUser, deleteUser, getUserByUsername } = require("../controller/user.controller");
const { verify } = require('../middleware/auth.middleware');

const router = require("express").Router();

router.route('/')
    .get(verify, getUsers)


router.route('/:blogName')
    .get(verify, getUserByUsername)
    .put(verify, updateUser)
    .delete(verify, deleteUser)



module.exports = router;