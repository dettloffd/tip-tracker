const mongoose = require("mongoose");

const connectDB = async (MONGO_URI) => {
  try {
    const conn = await mongoose.connect(
      
      MONGO_URI,
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
