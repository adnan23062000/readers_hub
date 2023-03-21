const { getUserByUsername, updateUser, getAllUsers, deleteUser } = require("../service/user.service");
const { checkParamValidity, checkPasswordLength, convertToLowerCase } = require("../utils/user.utils");
const { contentNegotiate } = require("../utils/contentNegotiation.utils");


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
            const result = await getUserByUsername(userName);

            if(result===null || result===undefined)
                return res.status(404).json({
                    success: false,
                    data: "user not found"
                });
            
            
            const resultArray = [];
            resultArray.push(result);
            contentNegotiate(req, res, resultArray);  
        }
        catch(error){
            console.log(error);
            return;
        }
        
    },



    getUsers: async (req, res) => {
        
        try{
            const results = await getAllUsers();

            contentNegotiate(req, res, results);
  
        }
        catch(error){
            console.log(error);
            return;
        }
    },



    updateUser: async (req, res) => {
        
        const body = req.body;

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