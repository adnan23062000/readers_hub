const BlogDTO = require('../DTO/blog.dto');
const { getStartingSerial } = require('../utils/pagination.utils');
const BlogRepository = require('../repository/blog.repository');

module.exports = {

  createBlog: async (data, author) => BlogRepository.createBlog(data.blogTitle, data.blogBody, author),

  getAllBlogs: async (page, limit) => {
    const pageStart = getStartingSerial(page, limit);

    const blogs = await BlogRepository.getAllBlogs(parseInt(pageStart, 10), parseInt(limit, 10));

    const blogsList = [];

    const dataValuesArray = blogs.map((blog) => blog.dataValues);

    for (let i = 0; i < dataValuesArray.length; i += 1) {
      const blogDTO = new BlogDTO(dataValuesArray[i]);
      blogsList.push(blogDTO);
    }

    return blogsList;
  },

  getBlogByBlogId: async (blogId) => {
    const blog = await BlogRepository.getBlogById(blogId);

    if (!blog) { return blog; }

    const dataValuesArray = blog.dataValues;
    const blogDTO = new BlogDTO(dataValuesArray);

    return blogDTO;
  },

  updateBlog: async (blogId, newBlogBody) => BlogRepository.updateBlog(blogId, newBlogBody),

  deleteBlog: async (blogId) => BlogRepository.deleteBlog(blogId),

};
