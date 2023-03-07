const db = require('../dbconnection');

var Leaderboard = {
    addUserResult: function (type, code, options, callback) {
        let project = "";
        options = options || {};

        if (options.project) {
            project = options.project;
            delete options.project;
        }

        options = JSON.stringify(options);

        db.query("insert into tasks (type, code, project, options, status, event) values (?, ?, ?, ?, ?, NOW())",
            [type, code, project, options, Leaderboard.Status.created], callback);
    },

    listResults: function (callback) {
        db.query("select * from tasks order by id desc limit 100", callback);
    }
};



module.exports = Leaderboard;