const http = require("http") ;
const mongoose = require("mongoose") ;
const app = require("./app") ;
const {getPlanetsList} = require("./models/planets.model");

//database url 
const Db_URL = "mongodb+srv://khalil:nourhenismyone@nasacluster.qvujp.mongodb.net/nasa?retryWrites=true&w=majority";


// setting port with process.env
const PORT = process.env.PORT || 8000 ;

// handling requests with express
const server = http.createServer(app) ;


mongoose.connection.once('open' , () => console.log('conncted to the database'));
mongoose.connection.once('error' , () => console.error('error connecting to the DB')) ;

// start server 
async function startServer() {

    await mongoose.connect(Db_URL) ;

    // get planets list ready 
    await getPlanetsList() ;
    
    // start listening 
    server.listen(PORT) ;
}

startServer();