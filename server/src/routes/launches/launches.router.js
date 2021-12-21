const express = require("express") ;
const {httpGetLaunches} = require("./launches.controller");
const launchesRouter  = express.Router() ;

// launches router 
launchesRouter.get('/launches' , httpGetLaunches) ;

module.exports = {
    launchesRouter ,
}