const axios = require("axios") ;
const launchesDB = require('./launches.mongo') ;
/* launch object example */
const launch = {
    flightNumber : 100 , // flight_number
    mission : 'Kepler Exploration X', // name
    rocket : 'Explorer ISI', // rocket.name
    launchDate: new Date('December 27,2030'), // date_local
    target: 'Kepler--442 b', // not applicable 
    customers: ['ZTM' , 'NASA'] , // payload.customers 
    upcoming: true , // upcoming
    success: true , // success 
};


const DEFAULT_FLIGHT_NUMBER = 100 ;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query" ;

// used to populate the rocket and payloads data
const POPULATE_OPTIONS = {   
    query : {},  
    options : {
        pagination : false ,
        populate: [
          {
            path: 'rocket',
            select: {
              name: 1
            }
          },
          {
            path : 'payloads' , 
            select: {
                customers : 1 
            }
          }
        ]
    }
} ;

async function populateLaunches() {

    console.log("downloading launch data...") ;

    // fetching launches data 
    const response = await axios.post(SPACEX_API_URL , POPULATE_OPTIONS);

    // check response health
    if(response.status !== 200) {
        console.log('error downloading launch data!') ;
        throw new Error('launch data download failed') ;
    }

    const launchDocs = response.data.docs ;

    // flattenig customers map 
    for( const launchDoc of launchDocs) {

        const payloads = launchDoc['payloads'];

        const customers =  payloads.flatMap((payload) => {
            return payload['customers']
        })


        // build launch object 
        const launch = {
            flightNumber : launchDoc['flight_number'] , 
            mission : launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate : launchDoc['date_local'],
            upcoming : launchDoc['upcoming'],
            success : launchDoc['success'],
            customers,
        }

        // inseting launches into DB 

        await saveLaunch(launch);
    }
}

// load launch data 
async function loadLaunchesData() {

    const firstLaunchExists = await findLaunch({
        flightNumber : 1 ,
        rocket : 'Falcon 1',
        mission : 'FalconSat' , 
    }) ; 

    if (firstLaunchExists){
        console.log('launch data is already loaded') ; 
    } else { 
        await populateLaunches(); 
    }

}

// check if a certain launch exists 
async function findLaunch(filter) {
    return await launchesDB.findOne(filter) ; 
}


// ! check if launch exists 
async function launchExists(id) {
    return await findLaunch({
        flightNumber : id
    });
} 


// returning launches list in array format 
async function getLaunchesList(skip , limit){
    return await launchesDB
        .find({} , {_id : 0 , __v : 0})
        .sort({flightNumber : 1})
        .skip(skip)
        .limit(limit);
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
    loadLaunchesData ,
    getLaunchesList ,
    ScheduleNewLaunch,
    launchExists ,
    abortLaunch ,
}