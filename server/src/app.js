const express = require("express") ;
const cors = require("cors") ;
const {planetsRoute} = require("./routes/planets.route") ;

// middlewares 
const app = express() ;
app.use(cors({origin : "http://localhost:3000"}));
app.use(express.json());

// routing 
app.use('/' , planetsRoute) ;
app.use('/planets' , planetsRoute) ;


module.exports = app ;