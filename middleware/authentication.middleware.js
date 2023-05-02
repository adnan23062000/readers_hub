const jwt = require('jsonwebtoken');

exports.isUserLoggedIn = function(req, res, next){
    
    let accessToken = req.cookies.jwt;

    if (!accessToken){
        return res.status(403).json({
            success: 0,
            message: "User is not logged in"
        });
    }

    try{
        const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
    }
    catch(e){
        return res.status(401).send(e);
    }
}