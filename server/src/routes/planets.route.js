const express = require("express");
const {getPlanets} = require("./planets.controller");
const planetsRoute = express.Router();

planetsRoute.get('/', getPlanets);


module.exports = {
    planetsRoute,
}