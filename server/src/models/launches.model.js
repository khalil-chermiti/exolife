const launches = new Map();

// our only lauch mission for the moment XD
const launch = {
    flightNumber : 100 ,
    mission : 'Kepler Exploration X',
    rocket : 'Explorer ISI',
    launchDate: new Date('December 27,2030'),
    target: 'Kepler--442 b',
    customer: ['ZTM' , 'NASA'] ,
    upcoming: true ,
    success: true ,
};

launches.set(launch.flightNumber , launch );

// returning launches list in array format 
function getLaunchesList () {
    return Array.from(launches.values()) ;
}
module.exports = {
    getLaunchesList ,
}