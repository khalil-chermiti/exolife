const {getLaunchesList , launchExists , abortLaunch, ScheduleNewLaunch} = require("../../models/launches.model");
const {getPagination} = require('../../services/pagination') ;
// ! get launches  
async function httpGetLaunches (req , res) {

    // get pagination options 
    const {skip , limit} = getPagination(req.query) ;

    const launches = await getLaunchesList(skip , limit);

    return res.status(200).json(launches) ;
}


// ! add a new launch 
async function httpAddLaunch (req , res ) {

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
    await ScheduleNewLaunch(launch) ;

    // resturn a creation success code ; 
    return res.status(201).json(launch);

}


// ! abort launch 
async function httpAbortLaunch(req , res) {

    let abortId = Number(req.params.id) ;
    const foundLaunch = await launchExists(abortId) ;
    
    // check if launch id exists
    if (!foundLaunch) {
        return res.status(404).json({error : "launch doesn't exist"}) ;
    }

    // abort the launch 
    const aborted = abortLaunch(abortId);

    if (!aborted) {
        return res.status(400).json({
            error: "could not abort mission" 
        })
    }

    res.status(200).json({
        aborted : true
    }) ;
}
module.exports ={
    httpGetLaunches ,
    httpAddLaunch ,
    httpAbortLaunch ,
}