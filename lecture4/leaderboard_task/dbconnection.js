const mysql = require('mysql');

var connection = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "",
    database: "leaderboard",
    multipleStatements: true
});

module.exports = connection;