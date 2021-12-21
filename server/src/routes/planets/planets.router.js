const express = require("express");
const planetsRouter = express.Router();
const {httpGetPlanets} = require("./planets.controller");

planetsRouter.get('/planets', httpGetPlanets);


module.exports = {
    planetsRouter,
}