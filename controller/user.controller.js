const { create, getUsers, getUserById, updateUser } = require("../service/user.service");
const  { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
    
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUserById: (req, res) => {
        const userName = req.params.userName;
        
        getUserById(userName, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(results.length===0){
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.json({
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
            return res.json({
                success: 1,
                data: results
            });
        })
    },


    updateUser: (req, res) => {
        const body = req.body;
        const userName = req.params.userName;

        console.log("user name:   " + userName);
        console.log(body);

        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        
        updateUser(userName, body, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            });
        });
    }




}