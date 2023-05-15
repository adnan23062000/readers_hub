const BlogService = require('../service/blog.service');
const { contentNegotiate } = require("../utils/contentNegotiation.utils");
const { pagination } = require('../utils/pagination.utils');
const Validation = require('../utils/requestValidation.utils');
const jwt = require('jsonwebtoken');

module.exports = {
    

    createBlog: async (req, res) => {


        const emptyReqBody = Validation.isRequestBodyEmpty(req.body);
        
        if(emptyReqBody)
            return res.status(emptyReqBody.status).json({success: emptyReqBody.success, message: emptyReqBody.message});
        
        
        const body = req.body;

        if(!body.blogTitle || !body.blogBody)
            return res.status(400).json({success: false, message: "Invalid request body"});
        

        console.log(req.cookies);
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const author = decoded.username;

        try{ 
            const blogData = await BlogService.createBlog(body, author);                
            return res.status(201).json({ success: true, message: "Blog created", data: blogData});   
        }
        catch(error){
            return res.status(500).json({ success: false, message: "Blog Creation failed"});
        }

    },
    
    
    
    getBlogById: async (req, res) => {
        
        const blogId = req.params.blogId;

        if(isNaN(parseInt(blogId)))
            return res.status(400).json({ success: false, message: "Invalid blog id" });
       
        try{         
            const result = await BlogService.getBlogById(blogId);

            if(!result)
                return res.status(404).json({ success: false, data: "Blog not found"});

            const resultArray = [];
            resultArray.push(result);
            contentNegotiate(req, res, resultArray);   
        }
        catch(error){
            return res.status(500).json({ success: false, message: 'error occured' });
        }
        
    },



    getAllBlogs: async (req, res) => {
        
        const paginationAttr = pagination(req.query.page, req.query.limit);
        
        try{  
            const results = await BlogService.getAllBlogs(parseInt(paginationAttr.page), parseInt(paginationAttr.limit));
            contentNegotiate(req, res, results);     
        }
        catch(error){
            return res.status(500).json({ success: false, message: 'error occured' });
        }
    },


    getBlogCount: async (req, res) => {
        try{
            const blogCount = await BlogService.getBlogCount();
            return res.status(200).json({ success: true, totalBlogs: blogCount});
        }
        catch(error){
            return res.status(500).json({ success: false, message: 'error occured'});
        }
    },


    updateBlog: async (req, res) => {
        
        const emptyReqBody = Validation.isRequestBodyEmpty(req.body);
        
        if(emptyReqBody)
            return res.status(emptyReqBody.status).json({success: emptyReqBody.success, message: emptyReqBody.message});
        
        const body = req.body;

        if(!body.blogBody){
            return res.status(400).json({ success: false, message: "Invalid request (No blog body included)" });
        }
        
        const blogId = req.params.blogId;
        
        try{
            const result = await BlogService.updateBlog(blogId, body.blogTitle, body.blogBody);
            if(result){
                return res.status(200).json({ success: true, data: "Blog updated successfully" });
            }
            return res.status(404).json({ success: false, data: "Blog not found" });
        }
        catch(error){
            return res.status(500).json({ success: false, message: "blog update failed" });
        }

    },



    deleteBlog: async (req, res) => {
        
        const blogId = req.params.blogId;
        
        try{
            const result = await BlogService.deleteBlog(blogId);
            if(result){
                return res.status(200).json({ success: true, data: "blog deleted successfully" });
            }
            return res.status(404).json({ success: false, data: "blog not found" });
        }
        catch(error){
            return res.status(500).json({ success: false, message: "Deletion failed"});
        }
        
        
    }


}