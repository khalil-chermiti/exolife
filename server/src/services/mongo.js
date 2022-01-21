const mongoose = require("mongoose");

// connecting to the DB
async function mongoConnect(DB_URL) {
	await mongoose.connect(DB_URL);
}

// disconnect from DB  
async function mongoDisconnect(DB_URL) {
	await mongoose.disconnect(DB_URL);
}

mongoose.connection.once('open' , () => console.log('connected to the database'));
mongoose.connection.once('error' , () => console.error('error connecting to the DB')) ;

module.exports = {
	mongoConnect ,
	mongoDisconnect , 
}