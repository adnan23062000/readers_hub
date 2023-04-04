const Blog = require('../model/blog.model');


const getAllBlogs = async (offset, limit) => {
  
    try{
        const blogs = await Blog.findAll({ offset, limit });
        return blogs;
    }
    catch(err){
        console.error(err.stack);
        throw err;
    }
};

const getBlogById = async (blogId) => {
  
    try{
        const blog = await Blog.findOne({ where: { blogId } });
        return blog;
    }
    catch(err){
        console.error(err.stack);
        throw err;
    }
};

const createBlog = async (blogTitle, blogBody, username) => {

    try{
        return await Blog.create({ blogTitle, blogBody, username });
    }
    catch(err){
        console.errpr(err.stack);
        throw err;
    }
};

const updateBlog = async (blogId, blogBody) => {
    
    try{
        const blog = await Blog.update({ blogBody }, {
          where: {
            blogId
          }
        });

        return blog;

      } 
      catch(err)
      {
        console.error(err.stack);
        throw err;
      }
};

const deleteBlog = async (blogId) => {
  
    try{
        return await Blog.destroy({ where: {
            blogId
          }});
    }
    catch(error){
        console.error(error.stack);
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
