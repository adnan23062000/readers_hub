const Blog = require('../model/blog.model');

const getAllBlogs = async (offset, limit) => {
    const blogs = await Blog.findAll({ order: [['updatedAt', 'DESC']], offset, limit });
    return blogs;
};

const getBlogById = async (blogId) => {
    const blog = await Blog.findOne({ where: { blogId } });
    return blog;
};

const createBlog = async (blogTitle, blogBody, username) => {
    return await Blog.create({ blogTitle, blogBody, username });
};

const updateBlog = async (blogId, blogTitle, blogBody) => {
    const blog = await Blog.update({ blogTitle, blogBody }, {
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

const getTotalBlogCount = async () => {
    const count = await Blog.count();
    return count;
};


module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getTotalBlogCount,
};
