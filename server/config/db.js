const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@stcluster-uyp7d.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    //after connected..
    console.log(`MONGO connected ${conn.connection.host}`.cyan.underline.bold);
  } catch (err) {
    //if connection doesnt work..
    console.log(`Error: ${err.message}`.red);
    //pass in "1" in order to cause exit with failure; will shut down application
    process.exit(1);
  }
};

module.exports = connectDB;
