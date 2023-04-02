const authService = require('../service/auth.service');
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
            const accessToken = await authService.registerUser(body);
            res.cookie("jwt", accessToken, { httpOnly: true });
                                  
            return res.status(201).json({
                success: true,
                message: "user created",
                token: accessToken
            });
        }
        catch(error){
            console.error(error);
            if(error.name === 'SequelizeValidationError')
                return res.status(400).json({success: false, message: SequelizerValidation.sequelizerErrorValidation(error)});

            return res.status(500).send();
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
        
        try{
        
            const accessToken = await authService.userLogin(username, password);

            res.cookie("jwt", accessToken, { httpOnly: true });
        
            res.status(200).json({
                success: true,
                message: "user logged in"
            });
        }
        catch(error){
            console.error(error);
            if(error.message === 'User not found')
                return res.status(404).json({ success: false, message: error.message });
            if(error.message === 'Incorrect Password')
                return res.status(401).json({ success: false, message: error.message });

            return res.status(500).send();
        }
    }
}

