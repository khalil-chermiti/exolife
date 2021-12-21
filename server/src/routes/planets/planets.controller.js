const {getPlanets}= require("../../models/planets.model") ;

function httpGetPlanets(req, res) {
    // get planets list from model and returns it
    return res.status(200).json(getPlanets());

}

module.exports = {
    httpGetPlanets, 
}