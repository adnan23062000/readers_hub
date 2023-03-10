const { getUserByUsername, updateUser, getAllUsers, createUser, deleteUser } = require("../service/user.service");
const { checkParamValidity } = require("../utils/user.utils");

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
                message: "invalid request"
            })
        
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

        if(!body.password){
            return res.status(400).json({
                message: "bad request"
            });
        }

        const userName = req.params.userName;

        if(!checkParamValidity(userName)){
            
            return res.status(400).json({
                message: "invalid request"
            })
        
        }

        try{
            const result = await updateUser(userName, body);
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