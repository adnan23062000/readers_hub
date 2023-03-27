const jwt = require('jsonwebtoken');

exports.isUserLoggedIn = function(req, res, next){
    
    let accessToken = req.cookies.jwt;


    if (!accessToken){
        return res.status(403).json({
            success: 0,
            message: "jwt authorization failed"
        });
    }

    let payload;

    try{
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.username = payload.username;
        next();
    }
    catch(e){
        return res.status(401).send(e);
    }
}