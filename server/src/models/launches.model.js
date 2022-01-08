const launchesDB = require('./launches.mongo') ;
const launches = new Map();

// our only lauch mission for the moment XD
let latestFlightNumber = 100 ;

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

// inserting the saved launch into DB (upsert)
async function saveLaunch(launch) {
    await launchesDB.updateOne(
        {flightNumber : launch.flightNumber} , 
        launch , 
        {upsert : true}
    )
}

// check if launch exists 
function launchExists(id) {
    return launches.has(id) ;
} 

//create launches function 
function addNewLaunch(launch) {
    // inc flightNumber ;
    latestFlightNumber++;

    // add new lanch to the launches object(map)
    launches.set(
    latestFlightNumber,
    Object.assign(launch, { 
        customer: ['ZTM' , 'NASA'] ,
        upcoming: true ,
        success: true ,
        flightNumber: latestFlightNumber 
    })
    );
} 

// aborting launch function 
function abortLaunch(launchId) {
    const aborted = launches.get(launchId) ;
    aborted.upcoming = false ;
    aborted.success = false ;

    return aborted ;
} 

// returning launches list in array format 
async function getLaunchesList(){
    return await launchesDB.find({} , {_id : 0 , __v : 0});
} 


module.exports = {
    getLaunchesList ,
    addNewLaunch ,
    launchExists ,
    abortLaunch ,
}