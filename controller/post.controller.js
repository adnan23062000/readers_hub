const { getUserByUsername, updateUser, getAllUsers, deleteUser } = require("../service/user.service");
const { checkParamValidity, compareHashedPassword } = require("../utils/user.utils");
const jwt = require('jsonwebtoken');

const BlogService = require('../service/post.service');


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
        
        
    }


}