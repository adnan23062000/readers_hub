const BlogDTO = require("../DTO/blog.dto");
const { calculateOffset } = require('../utils/pagination.utils');
const { getBlogsList } = require('../utils/dtoDataList.utils');
const BlogRepository = require('../repository/blog.repository');

module.exports = {
    
    createBlog: async (blogData, blogAuthor) => {
        return await BlogRepository.createBlog(blogData.blogTitle, blogData.blogBody, blogAuthor);
    },

    getAllBlogs: async (page, limit) => {

        const offset = calculateOffset(page, limit);
        
        const blogs = await BlogRepository.getAllBlogs(offset, limit);
        const blogsList = getBlogsList(blogs);

        return blogsList;
    },

    getBlogById: async (blogId) => {
        
        const blog = await BlogRepository.getBlogById(blogId);

        if(!blog)
            return null;
        
        const blogDTO = new BlogDTO(blog);
        return blogDTO;
    
    },

    updateBlog: async (blogId, updatedBlogBody) => {
        return await BlogRepository.updateBlog(blogId, updatedBlogBody);
    },

    deleteBlog: async (blogId) => {   
        return await BlogRepository.deleteBlog(blogId);
    },

};