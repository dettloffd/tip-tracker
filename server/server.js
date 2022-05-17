const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const connectDB = require("./config/db");


require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 1234;
const MONGO_URI = process.env.MONGO_URI;

//connect to db
connectDB(MONGO_URI);

const app = express();
//Bodyparser middleware
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

//import routes
const entriesRoutes = require("./routes/entries-routes");
const usersRoutes = require("./routes/users-routes")
// const insightsRoutes = require("./routes/insights-routes");
const statsRoutes = require("./routes/stats-routes");
const HttpError = require("./models/http-error");

app.use("/api/entries", entriesRoutes);
app.use("/api/user", usersRoutes)
// app.use("/api/insights", insightsRoutes)
app.use("/api/stats", statsRoutes)

app.use((req, res, next) => {
    // return res.status(404).json({
    //     success: false,
    //     message: "Could not locate this route"
    // })
    const error = new HttpError('Could not locate this route', 404);
    //console.log(error.message);
    throw error;
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
    res.json({message: error.message || 'some unknown error boi; this is from server.js'})
    //if no error.message property set up, fall back to this default
})
//message = ((`Systems fuuuunctional on port`, `${PORT}`, `boiiiii`))
app.listen(`${PORT}`, console.log(`Systems functional on port`.rainbow.bold, `${PORT}`.rainbow.bold));
//app.listen(`${PORT}`, console.log(message));