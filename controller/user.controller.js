const { getUserByUsername, updateUser, getAllUsers, createUser, deleteUser, userLogin } = require("../service/user.service");
const { checkParamValidity, compareHashedPassword } = require("../utils/user.utils");
const jwt = require('jsonwebtoken');

module.exports = {
    

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

            if(results===null || results===undefined)
                return res.status(404).json({
                    success: 0,
                    data: "user not found"
                });


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
        
        const username = req.body.username;
        const password = req.body.password;

        const user = await userLogin(username);

        const passwordMatched = await compareHashedPassword(password, user.password);

        console.log(passwordMatched);



        if (!username || !password || !passwordMatched) {
            return res.status(401).json({
                success: 0,
                message: "Incorrect username or password"
            });
        }

        let accessToken = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        });

        //console.log(accessToken);


        res.cookie("jwt", accessToken, { httpOnly: true });
        
        res.status(200).json({
            success: 1,
            message: "user logged in"
        });

    },


    userRegister: async (req, res) => {

        const body = req.body;
        const username = req.body.username;

        try{
            const data = await createUser(body);
            
            if(data){
                
                let accessToken = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: process.env.ACCESS_TOKEN_LIFE
                });
        
                console.log(accessToken);
        
        
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

    }



}