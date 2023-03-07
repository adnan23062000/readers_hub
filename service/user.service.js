const pool = require("../config/database");

module.exports = {
    
    create: (data, callBack) => {
        pool.query(
            `insert into user(Id, Username, Email, Password, CreatedAt, UpdatedAt)
            values(?,?,?,?,?,?)`, 
            [
                data.id,
                data.userName,
                data.email,
                data.password,
                data.createdAt,
                data.updatedAt
            ],
            (error, results, fields) => {
                if(error){
                    return  callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    getUsers: callBack => {
        pool.query(
            `select Id, Username, Email, Password, CreatedAt, UpdatedAt from user`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getUserById: (userName, callBack) => {
        pool.query(
            `select Id, Username, Email, Password, CreatedAt, UpdatedAt from user where Username= ?`,
            [userName],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    updateUser: (userName, data, callBack) => {
        pool.query(`update user set Id=?, Email=?, Password=?, CreatedAt=?, UpdatedAt=? where Username = ?`,
        [
            data.id,
            data.email,
            data.password,
            data.createdAt,
            data.updatedAt,
            userName
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        }
        );
    },


    deleteUser: (userName, callBack) => {
        pool.query(`delete from user where Username = ?`,
        [userName],
        (error, results, fields) => {
            if(error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    }



};