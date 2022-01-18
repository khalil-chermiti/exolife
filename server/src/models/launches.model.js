const launchesDB = require('./launches.mongo') ;
/* launch object example
launch = {
    flightNumber : 100 ,
    mission : 'Kepler Exploration X',
    rocket : 'Explorer ISI',
    launchDate: new Date('December 27,2030'),
    target: 'Kepler--442 b',
    customers: ['ZTM' , 'NASA'] ,
    upcoming: true ,
    success: true ,
};
*/

const DEFAULT_FLIGHT_NUMBER = 100 ;

// returning launches list in array format 
async function getLaunchesList(){
    return await launchesDB.find({} , {_id : 0 , __v : 0});
} 

// ! check if launch exists 
async function launchExists(id) {
    return launchesDB.findOne({
        flightNumber : id
    });
} 

async function getLatestFlightNumber() {
    const latestFlight = await launchesDB
        .findOne({})
        .sort('-flightNumber');
    
    if(!latestFlight) {
        return DEFAULT_FLIGHT_NUMBER ;
    }

    return latestFlight.flightNumber ;
}

// ! insert new launch to DB
async function saveLaunch(launch) {
    await launchesDB.findOneAndUpdate(
        {flightNumber : launch.flightNumber} , 
        launch , 
        {upsert : true}
    );
}

// ! schedule new launch (adding)
async function ScheduleNewLaunch(launch) {

    const flightNumber = await getLatestFlightNumber() + 1 ;

    const newLaunch = Object.assign(launch , {
        success :true ,
        upcoming: true ,
        customers : ['ZTM' , 'NASA'],
        flightNumber , 
    });

    await saveLaunch(newLaunch) ;
}

// aborting launch function 
async function abortLaunch(launchId) {

    // update launch
    const updateOBJ = await launchesDB.updateOne({
        flightNumber : launchId 
    } ,
    {
        success : false ,
        upcoming : false
    }) ;

    // return true on success 
    return updateOBJ.ok === 1 && updateOBJ.nModified === 1 ;
} 
 
module.exports = {
    getLaunchesList ,
    ScheduleNewLaunch,
    launchExists ,
    abortLaunch ,
}