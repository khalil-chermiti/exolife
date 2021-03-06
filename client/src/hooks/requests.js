// API URL 
const API_URL = 'http://localhost:8000/v1' ;

// Load planets and return as JSON.
async function httpGetPlanets() {
  let res = await fetch(`${API_URL}/planets`) ;
  return await res.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  let res = await fetch(`${API_URL}/launches`) ;
  let data = await res.json() ;
  return data.sort((a , b) => a.flightNumber - b.flightNumber) ;
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  
  // on error return ok : false to handle errors 
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch(err) {
    return {ok : false} ;
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method : "delete" ,
    }) ;
  } catch(err) {
    return {ok : false}
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};