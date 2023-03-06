const { createUser, getUserById, getUsers } = require("../controller/user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:userName", getUserById);

module.exports = router;
