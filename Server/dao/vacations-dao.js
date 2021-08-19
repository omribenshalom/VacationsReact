const connection = require('./connection-wrapper');
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

// ----------------------------------------
// Getall Vacations
async function getAll(userId) {
    let sql =
        `SELECT v.id as vacationId, v.destination, v.description, v.image, v.price,
            DATE_FORMAT(v.start_date, '%d/%m/%Y') AS startDate, 
            DATE_FORMAT(v.end_date,'%d/%m/%Y') AS endDate,
            follow_table.user_id AS isUserFollow,  

            (SELECT COUNT(*) FROM follow_table          
            WHERE vacation_id = v.id) AS numOfFollowers  

            FROM vacation v 

            LEFT JOIN follow_table 
            ON v.id=follow_table.vacation_id && follow_table.user_id= ?
            ORDER BY follow_table.user_id DESC;`

    let parameters = [userId];
    try {
        const vacations = await connection.executeWithParameters(sql, parameters);
        return vacations;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    };
};

// ----------------------------------------
// Get-one Vacation
async function getVacation(vacationId) {
    let sql = `SELECT * FROM vacation WHERE id=?`;
    let parameters = [vacationId]
    let vacation;
    try {
        vacation = await connection.executeWithParameters(sql, parameters);
        return vacation;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    };
};

// ----------------------------------------
// Add Vacation
async function addVacation(addVacationDetails) {
    let sql = `INSERT INTO vacation (destination, description, start_date, end_date, image, price) 
                VALUES (?,?,?,?,?,?);`
    let parameters = [
        addVacationDetails.destination,
        addVacationDetails.description,
        addVacationDetails.startDate,
        addVacationDetails.endDate,
        addVacationDetails.image,
        addVacationDetails.price,
    ];
    try {
        await connection.executeWithParameters(sql, parameters);
        console.log("ADD VACATION IS SUCCESSFUL !");
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    };
};

// ----------------------------------------
// Update Vacation
async function updateVacation(editVacationData) {
    let sql = `Update vacation 
                SET start_date =?, end_date =?, price =?
                WHERE destination =? AND description=? `;
    let parameters = [
        editVacationData.startDate,
        editVacationData.endDate,
        editVacationData.price,
        editVacationData.destination,
        editVacationData.description
    ]
    try {
        await connection.executeWithParameters(sql, parameters);
        console.log("UPDATE IS SUCCESSFUL !");
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    };
};

// ----------------------------------------
// Delete Vacation
async function deleteVacation(vacationId) {
    let sql = `DELETE from vacation WHERE id=?`;
    let parameters = [vacationId];
    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    };
};


module.exports = {
    getAll,
    getVacation,
    addVacation,
    updateVacation,
    deleteVacation
};