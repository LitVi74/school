/**
 * Created by andrey on 12.05.2021.
 */

'use strict';

const express = require('express');
const router = express.Router();

const LeaderBoard = require('../models/leaderboard');

router.all('/addUserResult', function (req, res, next) {
    let userId = req.query.userId;
    let rating = req.query.rating;

    LeaderBoard.addUserResult(userId, rating, function (err, result) {
        if (err) {
            console.error("Error addUserResult", err);
            return next(err);
        } else {
            res.json(result);
        }
    });
});

router.get('/', function (req, res, next) {
    LeaderBoard.listResults(function (err, result) {
        if (err) {
            return next(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;