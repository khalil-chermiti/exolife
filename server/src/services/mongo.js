const mongoose = require("mongoose");

// database url 
const Db_URL = "mongodb+srv://khalil:nourhenismyone@nasacluster.qvujp.mongodb.net/nasa?retryWrites=true&w=majority";

// connecting to the DB
async function mongoConnect() {
	await mongoose.connect(Db_URL);
}

// disconnect from DB  
async function mongoDisconnect() {
	await mongoose.disconnect(Db_URL);
}

mongoose.connection.once('open' , () => console.log('conncted to the database'));
mongoose.connection.once('error' , () => console.error('error connecting to the DB')) ;

module.exports = {
	mongoConnect ,
	mongoDisconnect , 
}