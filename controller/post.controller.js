const { isNumeric } = require("../utils/user.utils");
const jwt = require('jsonwebtoken');
const BlogService = require('../service/post.service');
const { contentNegotiate } = require("../utils/contentNegotiation.utils");
const { pagination } = require('../utils/pagination.utils');



module.exports = {
    

    createBlog: async (req, res) => {


        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                success: false,
                message: "Empty request body"
            });
        }

        
        const body = req.body;

        if(!body.blogTitle || !body.blogBody){
            return res.status(400).json({
                success: false,
                message: "Invalid request body"
            });
        }


        const accessToken = req.cookies.jwt; 
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const author = decodedToken.username;


        try{
            
            const data = await BlogService.createBlog(body, author);
            
            if(data){
                                  
                return res.status(201).json({
                    success: true,
                    data: "Blog created"
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Blog Creation failed"
            });
        }

    },
    
    
    
    getBlogById: async (req, res) => {
        
        const blogId = req.params.blogId;

        if(!isNumeric(blogId)){
            return res.status(400).json({
                success: false,
                message: "Invalid blog id"
            });
        }

        
        try{
            
            const result = await BlogService.getBlogByBlogId(blogId);

            if(!result)
                return res.status(404).json({
                    success: false,
                    data: "Blog not found"
                });

            
            const resultArray = [];
            resultArray.push(result);
            contentNegotiate(req, res, resultArray);
  
        }
        catch(error){
            console.log(error);
            return res.status(500).send();
        }
        
    },



    getAllBlogs: async (req, res) => {
        
        const paginationAttr = pagination(req.query.page, req.query.limit);
        
        try{
            
            const results = await BlogService.getAllBlogs(paginationAttr.page, paginationAttr.limit);

            contentNegotiate(req, res, results);
            
        }
        catch(error){
            console.log(error);
            return res.status(500).send();
        }
    },



    updateBlog: async (req, res) => {
        
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                success: false,
                message: "Empty request body"
            });
        }
        
        const body = req.body;

        if(!body.blogBody){
            return res.status(400).json({
                success: false,
                message: "Invalid request (No blog body included)"
            });
        }
        

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
            return res.status(500).json({
                success: false,
                message: "blog update failed"
            });
        }

    },



    deleteBlog: async (req, res) => {
        
        const blogId = req.params.blogId;
        
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
            return res.status(500).json({
                success: false,
                message: "Deletion failed"
            });
        }
        
        
    }


}