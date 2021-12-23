const express = require("express") ;
const {httpGetLaunches , httpAddLaunch , httpAbortLaunch} = require("./launches.controller");
const launchesRouter  = express.Router() ;

// launches router : /launches 

// get launches 
launchesRouter.get('/' , httpGetLaunches) ;

// add launch 
launchesRouter.post('/' , httpAddLaunch) ;

// abort launch (delele) 
launchesRouter.delete('/:id' , httpAbortLaunch)

module.exports = {
    launchesRouter ,
}