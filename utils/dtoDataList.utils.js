const UserDTO = require('../DTO/user.dto');
const BlogDTO = require('../DTO/blog.dto');

module.exports = {

    getUsersList: (users) => {
        
        const usersList = [];
        const dataValuesArray = users.map(user => user.dataValues);

        dataValuesArray.forEach(dataValue => {
            const userDTO = new UserDTO(dataValue);
            usersList.push(userDTO);
        });

        return usersList;
    },

    getBlogsList: (blogs) => {
        
        const blogsList = [];
        const dataValuesArray = blogs.map(blog => blog.dataValues);

        dataValuesArray.forEach(dataValue => {
            const blogDTO = new BlogDTO(dataValue);
            blogsList.push(blogDTO);
        });

        return blogsList;
    }



}