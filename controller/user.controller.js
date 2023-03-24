const { getUserByUsername, updateUser, getAllUsers, deleteUser } = require("../service/user.service");
const { checkParamValidity, checkPasswordLength, convertToLowerCase } = require("../utils/user.utils");


module.exports = {
    

    getUserByUsername: async (req, res) => {
        
        const userName = req.params.userName;

        if(!checkParamValidity(userName)){
            
            return res.status(400).json({
                success: false,
                message: "invalid request"
            });
        
        }
        
        try{
            const results = await getUserByUsername(userName);

            if(results===null || results===undefined)
                return res.status(404).json({
                    success: false,
                    data: "user not found"
                });


            return res.status(200).json({
                success: true,
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
                success: true,
                data: results
            });    
        }
        catch(error){
            console.log(error);
            return;
        }
    },



    updateUser: async (req, res) => {
        
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                success: false,
                message: "No request body"
            });
        }
        
        const body = req.body;

        if(!body.password){
            return res.status(400).json({
                success: false,
                message: "Invalid request body"
            });
        }

        const userName = req.params.userName;

        if(!checkParamValidity(userName)){
            
            return res.status(400).json({
                success: false,
                message: "invalid username"
            })
        
        }

        if(!checkPasswordLength(body.password)){
            return res.status(400).json({
                success: false,
                message: "password length too small"
            })
        }


        try{
            const result = await updateUser(convertToLowerCase(userName), body.password);
            if(result){
                return res.status(200).json({
                    success: true,
                    data: "user updated successfully"
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                success: false,
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
            const result = await deleteUser(convertToLowerCase(userName));
            if(result){
                return res.status(200).json({
                    success: true,
                    data: "user deleted successfully"
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                success: false,
                message: "bad request"
            });
        }
        
        
    }


}