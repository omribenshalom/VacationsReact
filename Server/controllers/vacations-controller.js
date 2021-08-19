const express = require("express");
const vacationsLogic = require("../logic/vacations-logic");
let cacheModule = require("../logic/cache-module");

const router = express.Router();

// ----------------------------------------
// Getall Vacations
router.get('/', async (req, res, next) => {
    // console.log("get all . controller");
    const userId = await cacheModule.extractUserDataFromCache(req).id;
    try {
        const vacations = await vacationsLogic.getAll(userId);
        // console.log("all vacations back from db : ", vacations)
        res.json(vacations);
    } catch (err) {
        console.error("err : ", err);
        return next(err);
    };
});

// ----------------------------------------
// Get-one Vacation
router.get('/:id', async (req, res, next) => {
    // console.log("get one . controller");
    const vacationId = req.params.id;
    try {
        const vacation = await vacationsLogic.getVacation(vacationId);
        res.json(vacation);
    } catch (err) {
        console.error("err : ", err);
        return next(err);
    };
});

// ----------------------------------------
// Add Vacation
router.post('/', async (req, res, next) => {
    // console.log("add vacation controller");
    const addVacationDetails = req.body;
    try {
        await vacationsLogic.addVacation(addVacationDetails);
        res.json();
    } catch (err) {
        console.error("err : ", err);
        return next(err);
    };
});

// ----------------------------------------
// Update Vacation
router.put('/', async (req, res, next) => {
        // console.log("update vacation controller");
        const vacationData = req.body;
    try {
        await vacationsLogic.updateVacation(vacationData);
        res.json();
    } catch (err) {
        console.error("err : ", err);
        return next(err);
    };
});

// ----------------------------------------
// Delete Vacation
router.delete('/:id', async (req, res, next) => {
    const vacationId = req.params.id;
    try {
        await vacationsLogic.deleteVacation(vacationId);
        res.json();
    } catch (err) {
        console.error("err : ", err);
        return next(err);
    };
});


module.exports = router;