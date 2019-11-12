const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const os = require("os");
const hostname = os.hostname();
console.log("Hostname is:"+hostname);

// create express app
const app = express();

// Link DB config file
const dbConfig = require('./config/database.config.js');

mongoose.Promise = global.Promise;  //

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
// app.get('/', (req, res) => {
//     res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
// });

// Require Notes routes
require('./app/routes/content.routes.js')(app);

// Require Users routes
require('./app/routes/users.routes.js')(app);

app.listen(2000,() => {
    console.log("Server running on port 2000");
});

// app.get("/url", (req, res, next) => {
//     res.json(["Tony","Lisa","Michael","Ginger","Food"]);
// });


//http.createServer(app).listen(80);