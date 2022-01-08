const {getLaunchesList , addNewLaunch , launchExists , abortLaunch} = require("../../models/launches.model");

// get launches and return them in the response 
async function httpGetLaunches (req , res) {
    return res.status(200).json(await getLaunchesList()) ;
}


// add a new launch 
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
            error : "missing mission informations"
        }
        ) ;
    }
    // check for valid date
    if(isNaN(new Date(launch.launchDate))) {
        return res.status(400).json( {
            error : "invalid date"
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


// abort launch 
function httpAbortLaunch(req , res) {

    let abortId = Number(req.params.id) ;

    // check if launch id exists
    if (!launchExists(abortId)) {
        return res.status(404).json({error : "launch doesn't exist"}) ;
    }

    // abort the launch 
    const aborted = abortLaunch(abortId);
    res.status(200).json(aborted) ;
}
module.exports ={
    httpGetLaunches ,
    httpAddLaunch ,
    httpAbortLaunch ,
}