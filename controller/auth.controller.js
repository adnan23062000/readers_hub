const authService = require('../service/auth.service');
const { compareHashedPassword, generateAccessToken } = require("../utils/userValidation.utils");
const Validation = require('../utils/requestValidation.utils');
const SequelizerValidation = require('../utils/sequelizerValidition.utils');


module.exports = {

    
    userRegister: async (req, res) => {
      
        const body = req.body;
        const emptyReqBody = Validation.validateRequestBody(body);
        
        if(emptyReqBody){
            return res.status(emptyReqBody.status).json({
                success: emptyReqBody.success,
                message: emptyReqBody.message
            })
        }

        if(!body.username || !body.email || !body.password)
            return res.status(400).json({success: false, message: 'one or more fields are empty'});

        try{    
            const userData = await authService.registerUser(body);

            const username = req.body.username;
            const accessToken = generateAccessToken(username);
        
            res.cookie("jwt", accessToken, { httpOnly: true });
                                  
            return res.status(201).json({
                success: true,
                message: "user created",
                data: userData
            });
        }
        catch(error){
            console.error(error);
            return res.status(400).json({
                success: false,
                message: SequelizerValidation.sequelizerErrorValidation(error)
            });
        }

    },
       
    
    userLogin: async (req, res) => {
        
        const body = req.body;
        const emptyReqBody = Validation.validateRequestBody(body);
        
        if(emptyReqBody){
            return res.status(emptyReqBody.status).json({
                success: emptyReqBody.success,
                message: emptyReqBody.message
            })
        }

        if(!body.username || !body.password)
            return res.status(400).json({success: false, message: 'one or more fields are empty'});
        
        const { username, password } = body;

        const user = await authService.userLogin(username);

        if(!user)
            return res.status(400).json({ success: false, message: "username doesn't exist" });
        
        const passwordMatched = await compareHashedPassword(password, user.password);
        
        if(!passwordMatched){
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

        let accessToken = generateAccessToken(username);

        res.cookie("jwt", accessToken, { httpOnly: true });
        
        res.status(200).json({
            success: true,
            message: "user logged in"
        });
    }
}

