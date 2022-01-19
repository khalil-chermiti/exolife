const express = require("express") ;
const path = require("path");
const morgan = require("morgan") ;
const cors = require("cors") ;
const api = require("./routes/api")

const app = express() ;

// middlewares 
app.use(cors({origin : "http://localhost:3000"}));

// print log to the STDOUT
app.use(morgan('tiny'));

// parse into json 
app.use(express.json());

// routing 

// mounting the react app 
app.use(express.static(path.join(__dirname , '..' , 'public'))) ;

// API V1  
app.use('/v1' , api);

app.get('/*' , (req ,res) => res.sendFile(path.join(__dirname , '..' , 'public' , 'index.html'))) ;


module.exports = app ;