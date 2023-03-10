const pool = require("../config/database");

module.exports = {

    createDB: callBack => {
        pool.query(`SHOW TABLES LIKE 'user'`, 
        [],
        (error, result, fields) => {
            if(error){
                throw error;
            }
            if (result.length === 0) {
                pool.query(
                  `CREATE TABLE user (
                    Id VARCHAR(255),
                    Username VARCHAR(60) PRIMARY KEY,
                    Email VARCHAR(60),
                    Password VARCHAR(25),
                    CreatedAt DATETIME,
                    UpdatedAt DATETIME
                  )`,
                  (err, result) => {
                    if (err) throw err;
                    console.log('Table user created!');
                });
            }
    });

    }

}