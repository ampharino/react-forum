const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const secrets = require('./config/secrets');
const auth = require('./routes/auth');
const users = require('./routes/users');

const app = express();

mongoose.connect(secrets.mongo_connection);


const allowCrossDomain = (req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/api/auth",auth);
app.use('/api/users',users);



//const db = mongoose.connection;
//db.on('error', console.error.bind(console, "connection error:"));
//db.once('open', () =>{
    //console.log("Connected to database");

//});
app.listen(3001, () => console.log('Server listening on port 3001'));

module.exports = app;
