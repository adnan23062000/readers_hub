const BlogService = require('../service/blog.service');
const { contentNegotiate } = require('../utils/contentNegotiation.utils');
const { pagination } = require('../utils/pagination.utils');

module.exports = {

  createBlog: async (req, res) => {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        success: false,
        message: 'Empty request body',
      });
    }

    const { body } = req;

    if (!body.blogTitle || !body.blogBody) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body',
      });
    }

    const author = req.username;

    try {
      const data = await BlogService.createBlog(body, author);

      if (data) {
        return res.status(201).json({
          success: true,
          data: 'Blog created',
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Blog Creation failed',
      });
    }
    return null;
  },

  getBlogById: async (req, res) => {
    const { blogId } = req.params;

    if (Number.isNaN(parseInt(blogId, 10))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog id',
      });
    }

    try {
      const result = await BlogService.getBlogById(blogId);

      if (!result) {
        return res.status(404).json({
          success: false,
          data: 'Blog not found',
        });
      }

      const resultArray = [];
      resultArray.push(result);
      contentNegotiate(req, res, resultArray);
    } catch (error) {
      console.error(error);
      return res.status(500).send();
    }
    return null;
  },

  getAllBlogs: async (req, res) => {
    const paginationAttr = pagination(req.query.page, req.query.limit);

    try {
      const results = await BlogService.getAllBlogs(parseInt(paginationAttr.page, 10), parseInt(paginationAttr.limit, 10));

      contentNegotiate(req, res, results);
    } catch (error) {
      console.error(error);
      return res.status(500).send();
    }
    return null;
  },

  updateBlog: async (req, res) => {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        success: false,
        message: 'Empty request body',
      });
    }

    const { body } = req;

    if (!body.blogBody) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request (No blog body included)',
      });
    }

    const { blogId } = req.params;

    try {
      const result = await BlogService.updateBlog(blogId, body.blogBody);
      if (result) {
        return res.status(200).json({
          success: true,
          data: 'Blog updated successfully',
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'blog update failed',
      });
    }

    return null;
  },

  deleteBlog: async (req, res) => {
    const { blogId } = req.params;

    try {
      const result = await BlogService.deleteBlog(blogId);
      if (result) {
        return res.status(200).json({
          success: true,
          data: 'blog deleted successfully',
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Deletion failed',
      });
    }
    return null;
  },
};
