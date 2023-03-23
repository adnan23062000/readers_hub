const router = require('express').Router();
const {
  getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog,
} = require('../controller/blog.controller');
const { verify } = require('../middleware/auth.middleware');
const { isAuthorized } = require('../middleware/isAuthorized.middleware');

router.route('/')
  .get(getAllBlogs)
  .post(verify, createBlog);

router.route('/:blogId')
  .get(getBlogById)
  .put(verify, isAuthorized, updateBlog)
  .delete(verify, isAuthorized, deleteBlog);

module.exports = router;
