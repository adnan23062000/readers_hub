const { createUser, userLogin } = require("../service/user.service");
const authService = require('../service/auth.service');
const { checkParamValidity, compareHashedPassword, generateAccessToken } = require("../utils/user.utils");
const jwt = require('jsonwebtoken');


module.exports = {

    
    userRegister: async (req, res) => {

        const body = req.body;
        const username = req.body.username;

        if(!body.username || !body.email || !body.password){
            res.status(400).json({
                success: 1,
                message: "Invalid request body"
            });
        }

        try{
            
            const data = await authService.registerUser(body);
            
            if(data){
                
                let accessToken = generateAccessToken(username);
        
                res.cookie("jwt", accessToken, { httpOnly: true });
                                  
                return res.status(201).json({
                    success: 1,
                    data: "user created"
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                message: "bad request"
            });
        }

    },
    
    
    
    userLogin: async (req, res) => {
        
        const username = req.body.username;
        const password = req.body.password;


        const user = await authService.userLogin(username);

        const passwordMatched = await compareHashedPassword(password, user.password);
        
        if (!username || !password || !passwordMatched) {
            return res.status(401).json({
                success: 0,
                message: "Incorrect username or password"
            });
        }

        let accessToken = generateAccessToken(username);


        res.cookie("jwt", accessToken, { httpOnly: true });
        
        res.status(200).json({
            success: 1,
            message: "user logged in"
        });

    },



}