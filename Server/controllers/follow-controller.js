const express = require("express");
const followLogic = require("../logic/follow-logic");
let cacheModule = require("../logic/cache-module");

const router = express.Router();

// ----------------------------------------
// Follow new vacation
router.post('/', async (req, res, next) => {
    console.log("follow vacation - controller");

    const userId = await cacheModule.extractUserDataFromCache(req).id;
    const vacationId = req.body.id;
    try {
        followLogic.followVacation(userId,vacationId);
        res.json();
    } catch (err) {
        console.error("err : ", err);
        return next(err);
    };
});

// ----------------------------------------
// Un-Follow vacation
router.delete('/:id', async (req, res, next) => {
    console.log("un-follow vacation - controller");

    const vacationId = req.params.id;
    const userId = await cacheModule.extractUserDataFromCache(req).id;

    console.log("vacationId (follow-controller)- " , vacationId)

    try {
        followLogic.unFollowVacation(userId,vacationId);
        res.json();
    } catch (err) {
        console.error("err : ", err);
        return next(err);
    };
});

module.exports = router;