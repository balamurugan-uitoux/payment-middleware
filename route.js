const express = require('express');
const bodyParser = require('body-parser');
// const { authJwt } = require("./app/middlewares");
const cors = require('cors');
const path = require('path');
// Routes Path

const router = express.Router();

const paymentRoutes = require('./app/routes/payment.routes');

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


router.all("/api/*", function(req, res, next) {
    if (req.method.toLowerCase() !== "options") {
        return next();
    }
    return res.send(204);
});

// router.get("/api/v1", (req, res) => {
//     res.json({ message: "Welcome to codergarage application." });
// });

router.get('/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    res.json({ message: "Welcome to payment middleware." });
});

router.get('/logo.svg', (req, res) => {
    res.sendFile(path.join(__dirname, 'logo.svg'))
})


router.use('/api/v1/payment', paymentRoutes);
// app.use('/upload', express.static(__dirname + '/upload'));
// app.use('/userImage', express.static(__dirname + '/userImage'));
// app.use('/reviewImages', express.static(__dirname + '/reviewImages'));
// app.use(express.static(__dirname + '/view'));
module.exports = router;