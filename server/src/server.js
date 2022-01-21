const http = require("http") ;
const app = require("./app") ;
const {getPlanetsList} = require("./models/planets.model");
const {loadLaunchesData} = require("./models/launches.model");
const {mongoConnect} = require("./services/mongo");

require('dotenv').config();

// setting port with process.env
const PORT = process.env.PORT || 8000 ;

const MONGO_URL = process.env.MONGO_DB ;

// handling requests with express
const server = http.createServer(app) ;

// start server 
async function startServer() {

    // connecting to mongoDB
    await mongoConnect(MONGO_URL);

    // get planets list ready 
    await getPlanetsList() ;
        
    // load launches data 
    await loadLaunchesData();

    // start listening 
    server.listen(PORT) ;

    console.log('server is running...');
}

startServer();