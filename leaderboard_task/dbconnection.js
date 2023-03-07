const mysql = require('mysql');

var connection = mysql.createPool({
    host: 'localhost',
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: process.env.database,
    multipleStatements: true
});

module.exports = connection;