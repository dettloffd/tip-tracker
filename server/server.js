const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const path = require('path');


require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 5000;

//connect to db
connectDB();

const app = express();
//Bodyparser middleware
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

// any request which reaches backend not handled by below routes..
// now handled by this route
// returns content of public folder
app.use(express.static(path.join('public')));

//import routes
const entriesRoutes = require("./routes/entries-routes");
const usersRoutes = require("./routes/users-routes")
const statsRoutes = require("./routes/stats-routes");

// backend route, these kick in:
app.use("/api/entries", entriesRoutes);
app.use("/api/user", usersRoutes)
app.use("/api/stats", statsRoutes)


// anything else, send the single page
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));

} );


app.use((req, res, next) => {
    return res.status(404).json({
        success: false,
        message: "Could not locate this route"
    })
})

app.use((error, req, res, next) => {
    //Express recognizes 'app.use' with 4 paramaters as special; this is seen as aspecial error handling middleware
    //only works if error is thrown
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500)
    //error.code property is set up in custom error handling class 'http-error'...
    //if none found, fall back to 500
    res.json({message: error.message || 'Uknown error occurred; this error is originating at the server.'})
    //if no error.message property set up, fall back to this default
})
app.listen(`${PORT}`, console.log(`Systems functional on port ${PORT}`.rainbow.bold));