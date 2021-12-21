const express = require("express");
const planetsRoute = express.Router();
const {getPlanets} = require("./planets.controller");

planetsRoute.get('/planets', getPlanets);


module.exports = {
    planetsRoute,
}