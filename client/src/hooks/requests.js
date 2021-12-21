// Load planets and return as JSON.
async function httpGetPlanets() {
  let res = await fetch("http://localhost:8000/planets") ;
  return await res.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  let res = await fetch("http://localhost:8000/launches") ;
  let data = await res.json() ;
  return data.sort((a , b) => a.flightNumber - b.flightNumber) ;
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};