const { getUserCount } = require("../controller/user.controller");
const { getBlogCount } = require("../controller/blog.controller");

const router = require("express").Router();

router.route('/users')
    .get(getUserCount)

router.route('/blogs')
    .get(getBlogCount)


module.exports = router;