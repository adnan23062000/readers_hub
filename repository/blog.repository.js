const Blog = require('../model/blog.model');

const getAllBlogs = async (offset, limit) => {
    const blogs = await Blog.findAll({ offset, limit });
    return blogs;
};

const getBlogById = async (blogId) => {
    const blog = await Blog.findOne({ where: { blogId } });
    return blog;
};

const createBlog = async (blogTitle, blogBody, username) => {
    return await Blog.create({ blogTitle, blogBody, username });
};

const updateBlog = async (blogId, blogBody) => {
    const blog = await Blog.update({ blogBody }, {
        where: {
            blogId
        }
    });
    return blog;
};

const deleteBlog = async (blogId) => {
    return await Blog.destroy({ where: {
        blogId
    }});
};


module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
