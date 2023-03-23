const Blog = require('../model/post.model');

// Get all blogs
const getAllBlogs = async (pageStart, limit) => {
  try {
    const blogs = await Blog.findAll({ offset: pageStart, limit });
    return blogs;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

// Get blog by blogId
const getBlogById = async (blogId) => {
  try {
    const blog = await Blog.findOne({ where: { blogId } });
    return blog;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

// Create new blog
const createBlog = async (blogTitle, blogBody, username) => {
  try {
    return await Blog.create({ blogTitle, blogBody, username });
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

// Update blog by blogId
const updateBlog = async (blogId, newBlogBody) => {
  try {
    const blog = await Blog.update({ blogBody: newBlogBody }, {
      where: {
        blogId,
      },
    });

    return blog;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

// Delete user by username
const deleteBlog = async (blogId) => {
  try {
    return await Blog.destroy({
      where: {
        blogId,
      },
    });
  } catch (error) {
    console.log(error.stack);
    throw error;
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
