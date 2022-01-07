const {getPlanets}= require("../../models/planets.model") ;

async function httpGetPlanets(req, res) {
    // get planets list from model and returns it
    return res.status(200).json(await getPlanets());

}

module.exports = {
    httpGetPlanets, 
}