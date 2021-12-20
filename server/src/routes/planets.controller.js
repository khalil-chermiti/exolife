const planetsList = require("../models/planets.model") ;

function getPlanets(req, res) {
    // get planets list from model and returns it
    return res.status(200).json(planetsList);
}

module.exports = {
    getPlanets,
}