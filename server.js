const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
const routesMain = require("./route.js");
app.use(cors())
// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "10mb" }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use(routesMain);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to payment middleware." });
});


// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});