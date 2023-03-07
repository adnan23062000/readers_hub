const pool = require("../config/database");
const UserDTO = require("../DTO/user.dto");
const UserUpdateDTO = require("../DTO/userUpdate.dto");

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
                const userDTO = new UserDTO(results);
                console.log(results);
                return callBack(null, userDTO);
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
                const userDTO = new UserDTO(results);
                console.log(userDTO);
                return callBack(null, userDTO);
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
            const userUpdateDTO = new UserUpdateDTO(data);
            console.log(data);
            return callBack(null, results, userUpdateDTO);
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