const jwt = require('jsonwebtoken');
const BlogService = require('../service/blog.service');
const { isNumeric } = require('../utils/user.utils');


module.exports = {

    isAuthorized: async(req, res, next) => {

        const currentUserId = req.params.blogId;

        if(!isNumeric(currentUserId)){
            return res.status(400).json({
                success: false,
                message: "Invalid blog id"
            });
        }


        const result = await BlogService.getBlogByBlogId(currentUserId);

        if(!result){
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        const authorOfThisBlog = result.author;

        const accessToken = req.cookies.jwt; 
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const currentUser = decodedToken.username;

        try{

            if(!(currentUser==authorOfThisBlog)){
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                })
            }
            
            next();
        }
        catch(e){
            return res.status(401).send(e);
        }

    }




}