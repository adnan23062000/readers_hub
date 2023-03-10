const { createUser, getUsers, updateUser, deleteUser, getUserByUsername } = require("../controller/user.controller");
const router = require("express").Router();

router.route('/')
    .post(createUser)
    .get(getUsers);


router.route('/:userName')
    .get(getUserByUsername)
    .put(updateUser)
    .delete(deleteUser)


module.exports = router;
