const UserDTO = require("../DTO/user.dto");
const { convertToLowerCase, generateUUID,  generateHashedPassword } = require("../utils/user.utils");
const BlogRepository = require('../repository/post.repository');

module.exports = {
    
    createBlog: async (data, author) => {

        return await BlogRepository.createBlog(data.blogTitle, data.blogBody, author);

    },



    getAllBlogs: async () => {
        
        const blogs = await BlogRepository.getAllBlogs();
        
        const blogsList = [];
        
        const dataValuesArray = blogs.map(blog => blog.dataValues);
        
        for (var i = 0; i < dataValuesArray.length; i++) {
            const blogDTO = new BlogDTO(dataValuesArray[i]);
            blogsList.push(blogDTO);
        }

        return blogsList;
    },



    getBlogByBlogId: async (blogId) => {
        
        const blog = await BlogRepository.getBlogById(blogId);

        if(blog===null || blog===undefined)
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