const {getLaunchesList} = require("../../models/launches.model");

// get launches and return them in the response 
function httpGetLaunches (req , res) {
    return res.status(200).json(getLaunchesList()) ;
}

module.exports ={
    httpGetLaunches ,
}