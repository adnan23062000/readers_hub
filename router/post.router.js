const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controller/post.controller');
const { verify } = require('../middleware/auth.middleware');

const router = require("express").Router();

router.route('/')
    .get(getAllBlogs)
    .post(verify, createBlog)


router.route('/:blogId')
    .get(getBlogById)
    .put(updateBlog)
    .delete(deleteBlog)



module.exports = router;