const { getUserByUsernameService, updateUserService, deleteUser, getAllUsersService, createUserService, deleteUserService } = require("../service/user.service");
const  { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
    
    createUser: async (req, res) => {
        
        const body = req.body;

        try{
            const data = await createUserService(body);
            if(data){
                return res.status(200).json({
                    success: 1,
                    data: "user created"
                });
            }
        }
        catch(error){
            console.log(error);
            return;
        }
        
        // create(body, (err, results) => {
        //     if(err) {
        //         if(err.code==='ER_DUP_ENTRY')
        //         {
        //             return res.status(409).json({
        //                 success: 0,
        //                 message: 'Error: User with this userName already exists',
        //             });
        //         }
        //         else{
        //             return res.status(500).json({
        //                 success: 0,
        //                 message: "post failed!",
        //             });
        //         }
        //     }
        //     return res.status(200).json({
        //         success: 1,
        //         data: results
        //     });
        // });
        
    },

    getUserById: async (req, res) => {
        
        const userName = req.params.userName;
        
        try{
            const results = await getUserByUsernameService(userName);
            return res.status(200).json({
                success: 1,
                data: results
            });    
        }
        catch(error){
            console.log(error);
            return;
        }

        // if (req.params.userName.includes(" ")) {
        //      return res.status(401).json({
        //         success: 0,
        //         data: "Parameter contains space character"
        //     });
        // }
        
    },

    getUsers: async (req, res) => {
        
        try{
            const results = await getAllUsersService();
 
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
            const result = await updateUserService(userName, body);
            if(result){
                return res.status(200).json({
                    success: 1,
                    data: "user updated successfully"
                });
            }
        }
        catch(error){
            console.log(error);
            return;
        }


        // if (req.params.userName.includes(" ")) {
        //     return res.status(401).json({
        //        success: 0,
        //        data: "Parameter contains space character"
        //    });
        // }

        //const salt = genSaltSync(10);
        //body.password = hashSync(body.password, salt);
        
        // updateUser(userName, body, (err, results, data) => {
        //     if(err) {
        //         console.log(err);
        //         return;
        //     }
        //     return res.status(200).json({
        //         success: 1,
        //         message: "updated successfully",
        //         message: results
        //     });
        // });

    },


    deleteUser: async (req, res) => {
        
        const userName = req.params.userName;

        // if (req.params.userName.includes(" ")) {
        //     return res.status(401).json({
        //        success: 0,
        //        data: "Parameter contains space character"
        //    });
        // }

        
        try{
            const result = await deleteUserService(userName);
            if(result){
                return res.status(200).json({
                    success: 1,
                    data: "user deleted successfully"
                });
            }
        }
        catch(error){
            console.log(error);
            return;
        }
        
        
        
        // deleteUser(userName, (err, results) => {
        //     if (err) {
        //         console.log(err);
        //         return;
        //       }
        //       if (!results) {
        //         return res.json({
        //           success: 0,
        //           message: "Record Not Found"
        //         });
        //       }
        //       return res.status(202).json({
        //         success: 1,
        //         message: "user deleted successfully"
        //       });
        // })
    }



}