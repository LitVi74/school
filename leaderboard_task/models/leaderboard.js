const db = require('../dbconnection');

var Leaderboard = {
    addUserResult: function (userId, rating, callback) {
        db.query("insert into leaderboard (userId, rating, event) values (?, ?, NOW())",
            [userId, rating], callback);
    },

    listResults: function (callback) {
        db.query("select * from leaderboard order by rating desc limit 100", callback);
    }
};

module.exports = Leaderboard;