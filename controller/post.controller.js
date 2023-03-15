const { getUserByUsername, updateUser, getAllUsers, deleteUser } = require("../service/user.service");
const { checkParamValidity, compareHashedPassword } = require("../utils/user.utils");
const jwt = require('jsonwebtoken');

const BlogService = require('../service/post.service');
const Blog = require("../model/post.model");


module.exports = {
    

    createBlog: async (req, res) => {

        const body = req.body;

        const author = "random author";

        if(!body.blogTitle || !body.blogBody || !author){
            res.status(400).json({
                success: 0,
                message: "Invalid request body"
            });
        }

        try{
            
            const data = await BlogService.createBlog(body, author);
            
            if(data){
                                  
                return res.status(201).json({
                    success: 1,
                    data: "blog created"
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                message: "Invalid request"
            });
        }

    },
    
    
    
    getBlogById: async (req, res) => {
        
        const blogId = req.params.blogId;

        if(!checkParamValidity(blogId)){
            
            return res.status(400).json({
                success: 0,
                message: "invalid request"
            });
        
        }
        
        try{
            const results = await BlogService.getBlogByBlogId(blogId);

            if(results===null || results===undefined)
                return res.status(404).json({
                    success: 0,
                    data: "blog not found"
                });


            return res.status(200).json({
                success: 1,
                data: results
            });    
        }
        catch(error){
            console.log(error);
            return;
        }
        
    },



    getAllBlogs: async (req, res) => {
        
        try{
            const results = await BlogService.getAllBlogs();
 
            return res.status(200).json({
                success: 1,
                data: results
            });    
        }
        catch(error){
            console.log(error);
            return;
        }
    },



    updateBlog: async (req, res) => {
        
        const body = req.body;

        const blogId = req.params.blogId;


        try{
            const result = await BlogService.updateBlog(blogId, body.blogBody);
            if(result){
                return res.status(200).json({
                    success: 1,
                    data: "user updated successfully"
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                message: "bad request"
            });
        }

    },



    deleteBlog: async (req, res) => {
        
        const blogId = req.params.blogId;

        if(!checkParamValidity(blogId)){
            
            return res.status(400).json({
                message: "invalid request"
            })
        
        }

        
        try{
            const result = await BlogService.deleteBlog(blogId);
            if(result){
                return res.status(200).json({
                    success: 1,
                    data: "blog deleted successfully"
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                message: "bad request"
            });
        }
        
        
    }


}