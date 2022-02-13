const mongoose = require('mongoose');

// connect to db
mongoose.connect('mongodb://127.0.0.1/codeial_development?authSource=admin');


const db = mongoose.connection;

// if error in connecting
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


// if success
db.once('open', function() {
    console.log("Connected to Database :: MongoDB")
});


module.exports = db;