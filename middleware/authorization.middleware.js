const jwt = require('jsonwebtoken');
const BlogService = require('../service/blog.service');


module.exports = {

    isUserAuthorized: async(req, res, next) => {

        const blogIdToEdit = req.params.blogId;

        if(isNaN(blogIdToEdit)){
            return res.status(400).json({
                success: false,
                message: "Invalid blog id"
            });
        }


        const result = await BlogService.getBlogById(blogIdToEdit);

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

            if(currentUser != authorOfThisBlog){
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