const connection = require('./connection-wrapper');
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

// ----------------------------------------
// Follow new vacation
async function followVacation(userId,vacationId) {
    // console.log("Follow. DAO !");

    let sql = `INSERT INTO follow_table (user_id, vacation_id) 
                VALUES (?,?);`
    let parameters = [
        userId,
        vacationId
    ];
    let followVacationResult;
    try {
        followVacationResult = await connection.executeWithParameters(sql, parameters);
        // console.log("followVacationResult.insertId - " , followVacationResult.insertId)
        console.log("FOLLOW VACATION IS SUCCESSFUL !");
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    };
};

// ----------------------------------------
// Un-Follow vacation
async function unFollowVacation(userId,vacationId) {
    console.log("Un-Follow. DAO !");
    console.log("userId - " , userId);
    console.log("vacationId - ", vacationId);

    let sql = `
            DELETE FROM follow_table WHERE user_id=? AND vacation_id=?; 
            `;
    let parameters = [
        userId,
        vacationId
    ];
    let followVacationResult;
    try {
        followVacationResult = await connection.executeWithParameters(sql, parameters);
        console.log("UN-FOLLOW VACATION (&& delet follow record) IS SUCCESSFUL !");
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    };
};


module.exports = {
    followVacation,
    unFollowVacation
};