const {parse} = require('csv-parse') ;
const fs = require('fs') ;
const path = require("path"); 

// planets list 
const results = [] ;

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
        fs.createReadStream(path.join(__dirname , '..' , 'data' , 'planetsTable.csv'))
            // piping the stream to the csv parser
            .pipe(parse({comment : '#' , columns : true}))
            // when we get data chunk check if planet is habitable 
            .on('data' , (data) => {if (isHabitable(data)) results.push(data) ;})
            // handling error
            .on('error' , (err) => {reject(err)}) 
            // when the stream end
            .on('end' , () => {resolve()}) ;
    })
}

module.exports = {
    getPlanetsList,
    planetsList : results ,
}
