const { getUserByUsername, updateUser, getAllUsers, deleteUser } = require("../service/user.service");
const { checkParamValidity, compareHashedPassword } = require("../utils/user.utils");
const jwt = require('jsonwebtoken');

const BlogService = require('../service/post.service');
const Blog = require("../model/post.model");


module.exports = {
    

    createBlog: async (req, res) => {

        const body = req.body;


        const accessToken = req.cookies.jwt; 
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const author = decodedToken.username;


        if(Object.keys(body).length === 0){
            return res.status(400).json({
                success: false,
                message: "Empty request body"
            });
        }

        if(!body.blogTitle || !body.blogBody){
            return res.status(400).json({
                success: false,
                message: "Invalid request body"
            });
        }

        try{
            
            //console.log(author);
            const data = await BlogService.createBlog(body, author);
            
            if(data){
                                  
                return res.status(201).json({
                    success: true,
                    data: "blog created"
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                success: false,
                message: "Invalid request"
            });
        }

    },
    
    
    
    getBlogById: async (req, res) => {
        
        const blogId = req.params.blogId;

        // if(!checkParamValidity(blogId)){
            
        //     return res.status(400).json({
        //         success: false,
        //         message: "invalid request"
        //     });
        
        // }
        
        try{
            
            const results = await BlogService.getBlogByBlogId(blogId);



            if(!results)
                return res.status(404).json({
                    success: false,
                    data: "blog not found"
                });


            return res.status(200).json({
                success: true,
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
                success: true,
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
                    success: true,
                    data: "Blog updated successfully"
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                success: false,
                message: "bad request"
            });
        }

    },



    deleteBlog: async (req, res) => {
        
        const blogId = req.params.blogId;

        if(!checkParamValidity(blogId)){
            
            return res.status(400).json({
                success: false,
                message: "invalid request"
            })
        
        }

        
        try{
            const result = await BlogService.deleteBlog(blogId);
            if(result){
                return res.status(200).json({
                    success: true,
                    data: "blog deleted successfully"
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                success: false,
                message: "bad request"
            });
        }
        
        
    }


}