const { create, getUsers, getUserById, updateUser, deleteUser } = require("../service/user.service");
const  { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
    
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if(err) {
                if(err.code==='ER_DUP_ENTRY')
                {
                    return res.status(409).json({
                        success: 0,
                        message: 'Error: User with this userName already exists',
                    });
                }
                else{
                    return res.status(500).json({
                        success: 0,
                        message: "post failed!",
                    });
                }
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
        
    },

    getUserById: (req, res) => {
        
        const userName = req.params.userName;
        
        if (req.params.userName.includes(" ")) {
             return res.status(401).json({
                success: 0,
                data: "Parameter contains space character"
            });
        }
        
        getUserById(userName, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(results.length===0){
                return res.status(404).json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },


    updateUser: (req, res) => {
        
        const body = req.body;

        const userName = req.params.userName.toLowerCase();

        if (req.params.userName.includes(" ")) {
            return res.status(401).json({
               success: 0,
               data: "Parameter contains space character"
           });
        }

        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        
        updateUser(userName, body, (err, results, data) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                success: 1,
                message: "updated successfully",
                message: results
            });
        });
    },


    deleteUser: (req, res) => {
        
        const userName = req.params.userName;

        if (req.params.userName.includes(" ")) {
            return res.status(401).json({
               success: 0,
               data: "Parameter contains space character"
           });
        }

        deleteUser(userName, (err, results) => {
            if (err) {
                console.log(err);
                return;
              }
              if (!results) {
                return res.json({
                  success: 0,
                  message: "Record Not Found"
                });
              }
              return res.status(202).json({
                success: 1,
                message: "user deleted successfully"
              });
        })
    }



}