const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controller/blog.controller');
const { isUserLoggedIn } = require('../middleware/auth.middleware');
const { isUserAuthorized } = require('../middleware/isAuthorized.middleware');

const router = require("express").Router();

router.route('/')
    .get(getAllBlogs)
    .post(isUserLoggedIn, createBlog)


router.route('/:blogId')
    .get(getBlogById)
    .put(isUserLoggedIn, isUserAuthorized, updateBlog)
    .delete(isUserLoggedIn, isUserAuthorized, deleteBlog)



module.exports = router;