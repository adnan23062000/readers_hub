const BlogDTO = require("../DTO/blog.dto");
const BlogRepository = require('../repository/blog.repository');

module.exports = {
    
    createBlog: async (data, author) => {

        return await BlogRepository.createBlog(data.blogTitle, data.blogBody, author);

    },



    getAllBlogs: async () => {
        
        const blogs = await BlogRepository.getAllBlogs();
        
        const blogsList = [];
        
        const dataValuesArray = blogs.map(blog => blog.dataValues);
        
        for (let i = 0; i < dataValuesArray.length; i++) {
            const blogDTO = new BlogDTO(dataValuesArray[i]);
            blogsList.push(blogDTO);
        }

        return blogsList;
    },



    getBlogById: async (blogId) => {
        
        const blog = await BlogRepository.getBlogById(blogId);

        if(!blog)
            return blog;
        
        
        const dataValuesArray = blog.dataValues;
        const blogDTO = new BlogDTO(dataValuesArray);
        
        return blogDTO;
    
    },



    updateBlog: async (blogId, newBlogBody) => {
        
        return await BlogRepository.updateBlog(blogId, newBlogBody);

    },



    deleteBlog: async (blogId) => {
        
        return await BlogRepository.deleteBlog(blogId);
    },





};