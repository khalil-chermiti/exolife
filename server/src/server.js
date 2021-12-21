const http = require("http") ;
const app = require("./app") ;
const {getPlanetsList} = require("./models/planets.model");

// setting port with process.env
const PORT = process.env.PORT || 8000 ;

// handling requests with express
const server = http.createServer(app) ;

// start server 
async function startServer() {

    // get planets list ready 
    try {
        await getPlanetsList() ;
    } catch(err) {
        alert('there was a problem loading planets list')
    }

    // start listening 
    server.listen(PORT) ;
}

startServer();