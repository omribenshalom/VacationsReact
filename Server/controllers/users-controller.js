const express = require("express");
const usersLogic = require("../logic/users-logic");
let cacheModule = require("../logic/cache-module");

const router = express.Router();

// ----------------------------------------
// Register
router.post('/', async (req, res, next) => {
    const userRegistrationDetails = req.body;
    // console.log("userRegistrationDetails" , userRegistrationDetails)
    try {
        const id = await usersLogic.addUser(userRegistrationDetails);
        res.json(id);
    } catch (err) {
        console.error("err : ", err);
        return next(err);
    };
});

// ----------------------------------------
// login 
router.post('/login', async (req, res, next) => {
    const userLoginDetails = req.body;
    // console.log("login controller data - " , userLoginDetails)
    try {
        let succsessfullyLoginData = await usersLogic.login(userLoginDetails);
        res.json(succsessfullyLoginData);
    } catch (err) {
        console.error("err : ", err);
        return next(err);
    };
});

// ----------------------------------------
// Getall
router.get('/', async (req, res, next) => {
    // console.log("get all . users controller");
    try {
        const users = await usersLogic.getAll();
        res.json(users);
    } catch (err) {
        console.error("err : ", err);
        return next(err);
    };
});

// ----------------------------------------
// Getall
router.get('/:id', async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await usersLogic.getUser(userId);
        res.json(user);
    } catch (err) {
        console.error("err : ", err);
        return next(err);
    };
});

// ----------------------------------------
// Update user
router.put('/', async (req, res, next) => {
    let userId = extractUserDataFromCache(req).id;
    try {
        const userDetails = req.body;
        userDetails.id = userId;
        await usersLogic.updateUser(userDetails);
        res.json(userDetails);
    } catch (err) {
        console.error("err : ", err);
        return next(err);
    };
});

// ----------------------------------------
// Delete user
router.delete('/:id', async (req, res, next) => {
    const userId = req.params.id;
    try {
        await usersLogic.deleteUser(userId);
        res.json();
    } catch (err) {
        console.error("err : ", err);
        return next(err);
    };
});

module.exports = router;