const { getUserByUsername, updateUser, getAllUsers, createUser, deleteUser } = require("../service/user.service");
const { checkParamValidity } = require("../utils/user.utils");
const jwt = require('json-web-token');

module.exports = {
    
    createUser: async (req, res) => {
        
        const body = req.body;

        try{
            const data = await createUser(body);
            if(data){
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



    getUserByUsername: async (req, res) => {
        
        const userName = req.params.userName;

        if(!checkParamValidity(userName)){
            
            return res.status(400).json({
                success: 0,
                message: "invalid request"
            });
        
        }
        
        try{
            const results = await getUserByUsername(userName);

            console.log(results);

            return res.status(200).json({
                success: 1,
                data: results
            });    
        }
        catch(error){
            console.log(error);
            return;
        }
        
    },



    getUsers: async (req, res) => {
        
        try{
            const results = await getAllUsers();
 
            return res.status(200).json({
                success: 1,
                data: results
            });    
        }
        catch(error){
            console.log(error);
            return;
        }
    },



    updateUser: async (req, res) => {
        
        const body = req.body;

        const userName = req.params.userName;


        try{
            const result = await updateUser(userName, body.password);
            if(result){
                return res.status(200).json({
                    success: 1,
                    data: "user updated successfully"
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



    deleteUser: async (req, res) => {
        
        const userName = req.params.userName;

        if(!checkParamValidity(userName)){
            
            return res.status(400).json({
                message: "invalid request"
            })
        
        }

        
        try{
            const result = await deleteUser(userName);
            if(result){
                return res.status(200).json({
                    success: 1,
                    data: "user deleted successfully"
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
        
        const username = req.body.userName;
        const password = req.body.password;

        let payload = {username: username}


        if (!username || !password){
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        });

        let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: process.env.REFRESH_TOKEN_LIFE
        });


        payload.refreshToken = refreshToken;

        res.cookie("jwt", accessToken, {secure: true, httpOnly: true});
        res.send();


    }



}