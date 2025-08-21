const mongoose = require("mongoose");

const connectDB = async () => {
    return mongoose.connect(process.env.LIVE_URL)

     .then(() => {
      console.log("Database Connection Successful ");
     })
     .catch((error) => {
        console.log(error);
     });
};

module.exports = connectDB;