const jwt = require('jsonwebtoken');

module.exports = {

    isUserAuthorized: async(req, res, next) => {

        const username = req.params.userName;
        const accessToken = req.cookies.jwt; 
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const currentUser = decodedToken.username;

        try{

            if(currentUser != username){
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