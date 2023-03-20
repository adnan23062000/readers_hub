const jwt = require('jsonwebtoken');
const { contentNegotiate } = require('../utils/userContentNegotiation.utils');

exports.verify = function(req, res, next){
    
    let accessToken = req.cookies.jwt;
    

    if (!accessToken){
        return res.status(403).json({
            success: 0,
            message: "jwt authorization failed"
        });
    }

    let payload;
    contentNegotiate(req)
    try{
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        next();
    }
    catch(e){
        return res.status(401).send(e);
    }
}