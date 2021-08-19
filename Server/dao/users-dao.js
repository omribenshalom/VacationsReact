let connection = require('../dao/connection-wrapper');
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

// ----------------------------------------
// Register
async function addUser(userRegistrationDetails) {

    let sql =   `INSERT INTO users (first_name, last_name, email, password) 
                VALUES (?,?,?,?)`;
    let parameters = [
        userRegistrationDetails.firstName,
        userRegistrationDetails.lastName,
        userRegistrationDetails.email, 
        userRegistrationDetails.password
        ];
    try {
        let userRegistrationResult = await connection.executeWithParameters(sql, parameters);
        console.log("REGISTRATION IS SUCCESSFUL !");
        return userRegistrationResult.insertId;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    };
};

// ----------------------------------------
// login
async function login(userLoginDetails) {
    // console.log("login dau - start" , userLoginDetails);
    let sql = `SELECT id, is_admin as isAdmin FROM users where email =? and password =?`
    let parameters = [userLoginDetails.email, userLoginDetails.password]
    let loginResult;
        try {
            loginResult = await connection.executeWithParameters(sql, parameters);
            
            if (loginResult.length === 0 || loginResult.length === null) {
                // console.log("if. dao login");
                throw new ServerError(ErrorType.UNAUTHORIZED, sql, e);
            };           
        }catch (e){
            // console.log("faild here at dao");
            throw new ServerError(ErrorType.UNAUTHORIZED, sql, e);
        }
    console.log('Login Is Successful.');
    return loginResult[0];
};

// ----------------------------------------
// Get all
async function getAll() {
    let sql = `SELECT id , email , password , is_admin as isAdmin FROM users`;
    const users = await connection.execute(sql);    
    return users;
};

// ----------------------------------------
// Get one
async function getUser(userId) {
    let sql =   `SELECT * FROM users WHERE id=?`;
    let parameters = [userId];
    const user = await connection.executeWithParameters(sql, parameters);
    console.log(user);
    return user;
};

// ----------------------------------------
//Update user
async function updateUser(user) {
    let sql =   `Update users 
                SET first_name =?, last_name =?, email =?, password =?
                WHERE id =? `;
    let parameters = [
        user.firstName,
        user.lastName, 
        user.email, 
        user.password, 
        user.id];
    try {
        await connection.executeWithParameters(sql, parameters);
        console.log("UPDATE IS SUCCESSFUL !");
    } catch (e) {
        console.log(e);
    };
};

// ----------------------------------------
// Delete user 
async function deleteUser(userId) {
    let sql = `DELETE from users WHERE id=?`;
    let parameters = [userId];
    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        console.log(e);
    };
};

// ----------------------------------------
// Validations
async function isUserNameExist(email) {
    let sql = `SELECT email from users where email=?`;
    const parameters = [email] ;
    const userExistResult = await connection.executeWithParameters(
        sql,
        parameters
    );
    if (userExistResult == null || userExistResult.length === 0) {
        return false;
    } ;
    // console.log('email already exsits.');
    return true;
};


module.exports = {
    addUser,
    login,
    getAll,
    getUser,
    updateUser,
    deleteUser,
    isUserNameExist
    };