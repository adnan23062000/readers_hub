const { getUsers, updateUser, deleteUser, getUserByUsername } = require("../controller/user.controller");
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controller/post.controller');
const { verify } = require('../middleware/auth.middleware');

const router = require("express").Router();

router.route('/')
    .get(verify, getAllBlogs)
    .post(verify, createBlog)


router.route('/:blogId')
    .get(verify, getBlogById)
    .put(verify, updateBlog)
    .delete(verify, deleteBlog)



module.exports = router;