const {parse} = require('csv-parse') ;
const fs = require('fs') ;

// state 
const results = [] ;

// check if planet is habitable 
const isHabitable = (planet)=> {
    if (planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] <= 1.11 && 
        planet['koi_insol'] >= 0.36 &&
        planet['koi_prad'] < 1.6 ) return true
}
// getting data as a stream 
fs.createReadStream('planetsTable.csv')
    // piping the stream to the csv parser
    .pipe(parse({comment : '#' , columns : true}))
    .on('data' , (data) => {
        if (isHabitable(data)) results.push(data) ;
    })
    // handling error
    .on('error' , (err) => {
        console.log("error!")
    })
    // when the stream end
    .on('end' , () => {
        results.forEach((planet) => console.log(planet.kepler_name)) ;
        console.log(`${results.length} habitable planets found !`) ;
    }) 