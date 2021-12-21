const express = require("express") ;
const path = require("path");
const morgan = require("morgan") ;
const cors = require("cors") ;
const {planetsRouter} = require("./routes/planets.router") ;

const app = express() ;

// middlewares 
app.use(cors({origin : "http://localhost:3000"}));

app.use(morgan('tiny'));
// parse into json 
app.use(express.json());

// routing 
app.use(express.static(path.join(__dirname , '..' , 'public'))) ;
app.use(planetsRouter) ;
app.get('/*' , (req ,res) => res.sendFile(path.join(__dirname , '..' , 'public' , 'index.html'))) ;


module.exports = app ;