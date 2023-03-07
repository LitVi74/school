/**
 * Created by andrey on 12.05.2021.
 */

'use strict';

const express = require('express');
const router = express.Router();

const LeaderBoard = require('../models/leaderboard');

router.all('/addUserResult', function (req, res, next) {
    let type = req.query.type;
    let code = req.query.code;
    let options = req.body.options || {};

    LeaderBoard.addUserResult(type, code, options, function (err, result) {
        if (err) {
            console.error("Error addUserResult", err);
            return next(err);
        } else {
            res.json(result);
        }
    });
});

router.get('/listResults', function (req, res, next) {
    LeaderBoard.listResults(function (err, result) {
        if (err) {
            return next(err);
        } else {
            res.json(result);
            res.write(JSON.stringify(result, undefined, 4));
            res.end();
        }
    });
});

module.exports = router;