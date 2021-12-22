const {getLaunchesList , addNewLaunch} = require("../../models/launches.model");

// get launches and return them in the response 
function httpGetLaunches (req , res) {
    return res.status(200).json(getLaunchesList()) ;
}

function httpAddLaunch (req , res ) {

    // get request body
    let launch = req.body ;

    // check for non empty input 
    if (
      !launch.rocket ||
      !launch.mission ||
      !launch.launchDate ||
      !launch.target
    ) {
        return res.status(400).json({
            "error" : "missing mission informations"
        }
        ) ;
    }
    // check for valid date
    if(isNaN(new Date(launch.launchDate))) {
        return res.status(400).json( {
            "error" : "invalid date"
        }
        ) ;
    }
    // generate a valid date format
    launch.launchDate = new Date(launch.launchDate);

    // create the new launch 
    addNewLaunch(launch) ;

    // resturn a creation success code ; 
    return res.status(201).json(launch);

}

module.exports ={
    httpGetLaunches ,
    httpAddLaunch ,
}