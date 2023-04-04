const BlogDTO = require("../DTO/blog.dto");
const { calculateOffset } = require('../utils/pagination.utils');
const BlogRepository = require('../repository/blog.repository');

module.exports = {
    
    createBlog: async (blogData, blogAuthor) => {
        return await BlogRepository.createBlog(blogData.blogTitle, blogData.blogBody, blogAuthor);
    },

    getAllBlogs: async (page, limit) => {

        const pageStart = calculateOffset(page, limit);
        const blogs = await BlogRepository.getAllBlogs(pageStart, limit);
        
        const blogsList = [];
        const dataValuesArray = blogs.map(blog => blog.dataValues);

        dataValuesArray.forEach(dataValue => {
            const blogDTO = new BlogDTO(dataValue);
            blogsList.push(blogDTO);
        });

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