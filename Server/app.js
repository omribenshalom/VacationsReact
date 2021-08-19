const express = require('express');
const cors = require('cors');
const usersController = require("./controllers/users-controller");
const vacationsController = require("./controllers/vacations-controller");
const followController = require("./controllers/follow-controller");

const errorHandler = require("./errors/error-handler");
const loginFilter = require("./middleware/login-filter");

const app = express();

app.use(cors({ origin: 'http://localhost:3000' })); //https not!!
app.use(express.json());

app.use(loginFilter());
app.use('/users', usersController);
app.use('/vacations', vacationsController);
app.use('/follow', followController);
app.use(errorHandler);


app.listen(4040, () => { 'poking on http://localhost:4040' });