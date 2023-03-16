const authService = require('../service/auth.service');
const { compareHashedPassword, generateAccessToken } = require("../utils/user.utils");


module.exports = {

    
    userRegister: async (req, res) => {

        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                success: false,
                message: "No request body"
            });
        }
        
        const body = req.body;
        const username = req.body.username;


        if(!body.username || !body.email || !body.password){
            return res.status(400).json({
                success: false,
                message: "Invalid request body"
            });
        }

        try{
            
            const data = await authService.registerUser(body);
            
            if(data){
                
                let accessToken = generateAccessToken(username);
        
                res.cookie("jwt", accessToken, { httpOnly: true });
                                  
                return res.status(201).json({
                    success: true,
                    data: "user created"
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                success: false,
                message: "Invalid or duplicate request"
            });
        }

    },
    
    
    
    userLogin: async (req, res) => {
        
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                success: false,
                message: "Empty request body"
            });
        }
        
        const username = req.body.username;
        const password = req.body.password;


        const user = await authService.userLogin(username);

        if (!username || !password) {
            return res.status(401).json({
                success: false,
                message: "Invalid request"
            });
        }
        
        const passwordMatched = await compareHashedPassword(password, user.password);
        

        if(!passwordMatched){
            res.status(401).json({
                success: false,
                message: "Incorrect username or password"
            });
        }

        else{
            let accessToken = generateAccessToken(username);

            res.cookie("jwt", accessToken, { httpOnly: true });
        
            return res.status(200).json({
                success: true,
                message: "user logged in"
            });
        }

    },



}