const dbConn = require('../model/Database');

function read(fields = '*', where = '',order = ''){
    dbConn.query(`SELECT ${fields} FROM cliente ${where} ${order}`, function(err, result, fields){
        if(err) throw err;
        return result;
    })
}

module.exports = read