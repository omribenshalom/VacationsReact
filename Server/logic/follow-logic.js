const followDao = require('../dao/follow-dao');

// ----------------------------------------
// Follow new vacation
async function followVacation(userId,vacationId) {
        // console.log("follow vacation - logic");
        await followDao.followVacation(userId,vacationId);
    };

// ----------------------------------------
// Un-Follow vacation
async function unFollowVacation(userId,vacationId) {
        // console.log("un-follow vacation - logic");
        await followDao.unFollowVacation(userId,vacationId);
    };

module.exports = {
    followVacation,
    unFollowVacation
    };