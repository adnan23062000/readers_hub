const BlogService = require('../service/blog.service');
const { contentNegotiate } = require("../utils/contentNegotiation.utils");
const { pagination } = require('../utils/pagination.utils');
const Validation = require('../utils/requestValidation.utils');

module.exports = {
    
    createBlog: async (req, res) => {

        const emptyReqBody = Validation.validateRequestBody(req.body);
        const body = req.body;
        
        if(emptyReqBody)
            return res.status(emptyReqBody.status).json({success: emptyReqBody.success, message: emptyReqBody.message});      

        if(!body.blogTitle || !body.blogBody)
            return res.status(400).json({success: false, message: "Invalid request body"});

        try{ 
            const author = req.username;
            const blogData = await BlogService.createBlog(body, author);                
            return res.status(201).json({ success: true, message: "Blog created", data: blogData });   
        }
        catch(error){
            return res.status(500).json({ success: false, message: "Blog Creation failed" });
        }
    },
            
    getBlogById: async (req, res) => {
        
        const blogId = req.params.blogId;

        if(isNaN(parseInt(blogId)))
            return res.status(400).json({ success: false, message: "Invalid blog id" });
       
        try{         
            const result = await BlogService.getBlogById(blogId);

            if(!result)
                return res.status(404).json({ success: false, message: "Blog not found" });

            const resultArray = [];
            resultArray.push(result);
            contentNegotiate(req, res, resultArray);   
        }
        catch(error){
            return res.status(500).send();
        }
        
    },

    getAllBlogs: async (req, res) => {
        
        try{  
            const paginationAttr = pagination(req.query.page, req.query.limit);
            const results = await BlogService.getAllBlogs(parseInt(paginationAttr.page), parseInt(paginationAttr.limit));
            contentNegotiate(req, res, results);     
        }
        catch(error){
            return res.status(500).send();
        }
    },

    updateBlog: async (req, res) => {
        
        const body = req.body;
        const emptyReqBody = Validation.validateRequestBody(req.body);
        
        if(emptyReqBody)
            return res.status(emptyReqBody.status).json({ success: emptyReqBody.success, message: emptyReqBody.message });
        
        if(!body.blogBody)
            return res.status(400).json({ success: false, message: "Invalid request (No blog body included)" });
        
        try{
            const blogId = req.params.blogId;
            const result = await BlogService.updateBlog(blogId, body.blogBody);
            if(result){
                return res.status(200).json({ success: true, message: "Blog updated successfully" });
            }
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        catch(error){
            return res.status(500).json({ success: false, message: "blog update failed" });
        }

    },

    deleteBlog: async (req, res) => {
        
        try{
            const blogId = req.params.blogId;
            const result = await BlogService.deleteBlog(blogId);
            if(result){
                return res.status(200).json({ success: true, message: "blog deleted successfully" });
            }
            return res.status(404).json({ success: false, message: "blog not found" });
        }
        catch(error){
            return res.status(500).json({ success: false, message: "Deletion failed" });
        }      
    }

}