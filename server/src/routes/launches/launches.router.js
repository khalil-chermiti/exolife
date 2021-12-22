const express = require("express") ;
const {httpGetLaunches , httpAddLaunch} = require("./launches.controller");
const launchesRouter  = express.Router() ;

// launches router : /launches 

// get launches 
launchesRouter.get('/' , httpGetLaunches) ;

// add launch 
launchesRouter.post('/' , httpAddLaunch) ;

module.exports = {
    launchesRouter ,
}