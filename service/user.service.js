const pool = require("../config/database");

module.exports = {
    create: (data, callBack) => {
        console.log("hi" + data.id, data.userName);
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
    }
}