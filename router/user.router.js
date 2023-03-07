const { createUser, getUserById, getUsers, updateUser, deleteUser } = require("../controller/user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:userName", getUserById);
router.put("/:userName", updateUser);
router.delete("/:userName", deleteUser);

module.exports = router;
