let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

const usersDao = require('../dao/users-dao');
const cacheModule = require("./cache-module");

// hash & token
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const saltLeft = "ks9jdus9020@#$G";
const saltRight = "jo39gfBnd9@#%*lk";
const config = require('../config.json');

// ----------------------------------------
// Register
async function addUser(userRegistrationDetails) {
    console.log("register logic");
    // validate valid details
    validateUserDetails(userRegistrationDetails);
    //is email taken
    if (await usersDao.isUserNameExist(userRegistrationDetails.email)) {
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    };
    //hash password
    userRegistrationDetails.password = crypto.
    createHash("md5").
    update(saltLeft + userRegistrationDetails.password + saltRight).
    digest("hex");
    // send back user id
    const id = await usersDao.addUser(userRegistrationDetails);
    return id;
};

// ----------------------------------------
// Login 
async function login(userLoginDetails) {
    console.log("login logic");

    validateDetailsLogin(userLoginDetails);

    //hash password
    userLoginDetails.password = crypto
        .createHash("md5")
        .update(saltLeft + userLoginDetails.password + saltRight)
        .digest("hex");
    let userData = await usersDao.login(userLoginDetails);
    //token making
    let saltedUserName = saltLeft + userLoginDetails.email + saltRight;
    const jwtToken = jwt.sign({
        sub: saltedUserName
    }, config.secret);

    // saving in cache userData. token as key.
    cacheModule.set(jwtToken, userData);

    //returning to controller token as object
    const successfullLoginResponse = {
        token: jwtToken,
        isAdmin: userData.isAdmin
    };
    return successfullLoginResponse;
};

// ----------------------------------------
// Get all
async function getAll() {
    // console.log("get all . logic");
    const users = await usersDao.getAll();
    return users;
};

// ----------------------------------------
// Get one
async function getUser(userId) {
    const user = await usersDao.getUser(userId);
    return user;
};

// ----------------------------------------
// Update user
async function updateUser(userDetails) {
    await usersDao.updateUser(userDetails);
};

// ----------------------------------------
// Delete user
async function deleteUser(userId) {
    await usersDao.deleteUser(userId);
};

// ----------------------------------------
// Validations
function validateUserDetails(userRegistrationDetails) {
    if (userRegistrationDetails.firstName == null) {
        throw new Error(`please enter first name.`)
    };
    if (userRegistrationDetails.lastName == null) {
        throw new Error(`please enter last name.`)
    };
    if (userRegistrationDetails.email == null) {
        throw new Error(`please enter e-mail.`)
    };
    if (userRegistrationDetails.password == null) {
        throw new Error(`please enter password.`)
    };
    if (userRegistrationDetails.password.length < 4) {
        throw new Error(`password is too short. valid password is between 4 to 12.`)
    };
    if (userRegistrationDetails.password.length > 12) {
        throw new Error(`password is too long. valid password is between 4 to 12.`)
    };
};

// ----------------------------------------
function validateDetailsLogin(userLoginDetails) {
    if (userLoginDetails.email == null) {
        throw new Error(`please enter e-mail.`)
    };
    if (userLoginDetails.password == null) {
        throw new Error(`please enter password.`)
    };
    if (userLoginDetails.password.length < 4) {
        throw new Error(`password is too short. valid password is between 4 to 12.`)
    };
    if (userLoginDetails.password.length > 12) {
        throw new Error(`password is too long. valid password is between 4 to 12.`)
    };
};


module.exports = {
    addUser,
    login,
    getAll,
    getUser,
    updateUser,
    deleteUser
};