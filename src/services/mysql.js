const mysql = require('mysql');

const pool = mysql.createPool({
    host            : process.env.MYSQL_HOST,
    database        : process.env.MYSQL_NAME,
    password        : process.env.MYSQL_PASS,
    user            : process.env.MYSQL_USER,
    port            : process.env.MYSQL_PORT,
    connectionLimit : process.env.MYSQL_POOL
});

exports.execute = (query, params=[]) => {
    return new Promise((resolve, reject) => {
        pool.query(query,params, (err, result, fields) => {
            if (err){
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
};

exports.pool = pool;