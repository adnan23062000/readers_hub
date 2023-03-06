const { createUser, getUserById, getUsers, updateUser } = require("../controller/user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:userName", getUserById);
router.put("/:userName", updateUser);

module.exports = router;
