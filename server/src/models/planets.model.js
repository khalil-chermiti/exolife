const {parse} = require('csv-parse') ;
const fs = require('fs') ;
const path = require("path"); 

const planets = require("./planets.mongo") ; 

// check if planet is habitable 
const isHabitable = (planet)=> {
    if (planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] <= 1.11 && 
        planet['koi_insol'] >= 0.36 &&
        planet['koi_prad'] < 1.6 ) return true
}

// filter habitable planets
function getPlanetsList() {

    return new Promise((resolve , reject) => {

        // getting data as a stream 
        fs.createReadStream(
          path.join(__dirname, "..", "data", "planetsTable.csv")
        )
          // piping the stream to the csv parser
          .pipe(parse({ comment: "#", columns: true }))

          // saving the chunk of data in the DB
          .on("data", async (data) => {
            if (isHabitable(data)) {
                await savePlanet(data);
            };
          })

          .on("error", (err) => {
            reject("there was an error processing planets list");
          })

          .on("end", async() => {
            console.log(`got ${ (await getPlanets()).length} planets`) ;
            resolve();
          });
    })
}

// get planets list from the DB
async function getPlanets () {
    return await planets.find({}) ;
}

// upsert planets in the DB 
async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {keplerName : planet.kepler_name},
      {keplerName : planet.kepler_name},
      {upsert : true}
    )
  } catch (error) {
    console.log("couldn't insert planet") ; 
  }
}


module.exports = {
    getPlanetsList,
    getPlanets,
}