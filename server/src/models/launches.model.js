const launchesDB = require('./launches.mongo') ;
const launches = new Map();


const DEFAULT_FLIGHT_NUMBER = 100 ;

const launch = {
    flightNumber : 100 ,
    mission : 'Kepler Exploration X',
    rocket : 'Explorer ISI',
    launchDate: new Date('December 27,2030'),
    target: 'Kepler--442 b',
    customers: ['ZTM' , 'NASA'] ,
    upcoming: true ,
    success: true ,
};

launches.set(launch.flightNumber , launch );

saveLaunch(launch) ;

// ! inserting the saved launch into DB (upsert)
async function saveLaunch(launch) {
    await launchesDB.findOneAndUpdate(
        {flightNumber : launch.flightNumber} , 
        launch , 
        {upsert : true}
    );
}

// ! check if launch exists 
function launchExists(id) {
    return launches.has(id) ;
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
function abortLaunch(launchId) {
    const aborted = launches.get(launchId) ;
    aborted.upcoming = false ;
    aborted.success = false ;

    return aborted ;
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

// returning launches list in array format 
async function getLaunchesList(){
    return await launchesDB.find({} , {_id : 0 , __v : 0});
} 


module.exports = {
    getLaunchesList ,
    ScheduleNewLaunch,
    launchExists ,
    abortLaunch ,
}