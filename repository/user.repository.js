const pool = require("../config/database");

module.exports = {

    
    async getAllUsersRepo() {
        try{
            const data = await pool.query(`select * from user`);
            return data;
        }
        catch(error){
            console.log(error.stack);
            throw error;
        }
    },



    async getUserByUsernameRepo(userName) {
        try{
            const data = pool.query(
                `select Id, Username, Email, Password, CreatedAt, UpdatedAt from user where Username= ?`,
                [userName]);
            
            return data;
        }
        catch(error){
            console.log(error.stack);
            throw error;
        }
    },



    async createUserRepo(myUuid, data) {
        try{
            return await pool.query(
                `insert into user(Id, Username, Email, Password, CreatedAt, UpdatedAt) values(?,?,?,?,?,?)`, 
                [
                    myUuid,
                    data.userName,
                    data.email,
                    data.password,
                    data.createdAt,
                    data.updatedAt
                ]);
        }
        catch(error){
            console.log(error.stack);
            throw error;
        }
    },



    async updateUserRepo(updatedPassword, userName){

        try{
            return await pool.query(
                `update user set Password = ? where Username = ?`,
                [
                    updatedPassword, 
                    userName
                ]);
        }
        catch(error){
            console.log(error.stack);
            throw error;
        }

    },



    async deleteUserRepo(userName){
        try{
            return await pool.query(
                `delete from user where Username = ?`,
                [
                    userName
                ]);
        }
        catch(error){
            console.log(error.stack);
            throw error;
        }
    }




}