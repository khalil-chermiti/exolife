const launches = new Map();

// our only lauch mission for the moment XD
const launch = {
    flightNumber : 100 ,
    mission : 'Kepler Exploration X',
    rocket : 'Explorer ISI',
    launchDate: new Date('December 27,2030'),
    destination: 'Kepler--442 b',
    customer: ['ZTM' , 'NASA'] ,
    upcoming: true ,
    success: true ,
};

lauches.set(lauch.flight , launch );

module.exports = {
    launches ,
}