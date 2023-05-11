const { getUserByUsername, getUserWithPassword, updateUser, getAllUsers, deleteUser, getUserCount } = require("../service/user.service");
const { isParamValid, checkPasswordLength, convertToLowerCase } = require("../utils/userValidation.utils");
const { contentNegotiate } = require("../utils/contentNegotiation.utils");
const { pagination } = require('../utils/pagination.utils');
const { compareHashedPassword } = require('../utils/userValidation.utils');
const Validation = require('../utils/requestValidation.utils');


module.exports = {
    
    getUserByUsername: async (req, res) => {
        const userName = req.params.userName;

        if(!isParamValid(userName)){
            res.status(400);
            return res.json({success: false, message: "invalid request"});
        }
        
        try{
            const result = await getUserByUsername(userName, true);
            if(!result)
                return res.status(404).json({
                    success: false,
                    data: "user not found"
            });
            
            const resultArray = [];
            resultArray.push(result);
            contentNegotiate(req, res, resultArray);  
        }
        catch(error){
            return res.status(500).json({ success: false, message: 'error occured'});
        }
        
    },


    getUsers: async (req, res) => {
        
        const paginationAttr = pagination(req.query.page, req.query.limit);

        try{
            const results = await getAllUsers(paginationAttr.page, paginationAttr.limit);
            contentNegotiate(req, res, results);
        }
        catch(error){
            return res.status(500).json({ success: false, message: 'error occured'});
        }
    },

    getUserCount: async (req, res) => {
        try{
            const userCount = await getUserCount();
            return res.status(200).json({ success: true, totalUsers: userCount});
        }
        catch(error){
            return res.status(500).json({ success: false, message: 'error occured'});
        }
    },

    updateUser: async (req, res) => {
        
        const body = req.body;
        const emptyReqBody = Validation.isRequestBodyEmpty(body);
        
        if(emptyReqBody){
            return res.status(emptyReqBody.status).json({
                success: emptyReqBody.success,
                message: emptyReqBody.message
            })
        }

        if(!body.password || !body.currentPassword)
            return res.status(400).json({ success: false, message: "Invalid request body"}); 

        const userName = req.params.userName;

        if(!isParamValid(userName))
            return res.status(400).json({ success: false, message: "invalid username"})
         

        if(!checkPasswordLength(body.password)){
            return res.status(400).json({
                success: false,
                message: "password length should be atleast 6 characters"
            })
        }

        const currentUser = await getUserWithPassword(userName, true);
        const currentPasswordCorrect = await compareHashedPassword(body.currentPassword, currentUser.password);
        
        if(!currentPasswordCorrect){
            return res.status(400).json({
                success: false,
                message: "current password is not correct"
            })
        }

        try{
            const result = await updateUser(convertToLowerCase(userName), body.password);
            if(result[0]){
                return res.status(200).json({
                    success: true,
                    data: "Password updated successfully"
                });
            }
            return res.status(404).json({ success: true, data: "user not found"});
        }
        catch(error){
            return res.status(500).json({
                success: false,
                message: "user update failed"
            });
        }

    },



    deleteUser: async (req, res) => {
        
        const userName = req.params.userName;

        if(!isParamValid(userName))
            return res.status(400).json({ success: false, message: "invalid request" });

        
        try{
            const result = await deleteUser(convertToLowerCase(userName));
            if(result){
                return res.status(200).json({
                    success: true,
                    data: "user deleted successfully"
                });
            }
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }
        catch(error){
            return res.status(500).json({
                success: false,
                message: "user deletion failed"
            });
        }
        
        
    }


}