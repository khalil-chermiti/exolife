const express = require("express");
const planetsRoute = express.Router();
const {getPlanets} = require("./planets.controller");

planetsRoute.get('/', getPlanets);


module.exports = {
    planetsRoute,
}