const { createUser, getUserById, getUsers, updateUser, deleteUser } = require("../controller/user.controller");
const router = require("express").Router();

router.route('/')
    .post(createUser)
    .get(getUsers);


router.route('/:userName')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)


module.exports = router;
