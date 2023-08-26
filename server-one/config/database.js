const mongoose = require("mongoose");

const connectDB = (url) => {
  try {
    mongoose.set("strictQuery", false);
    return mongoose.connect(url, {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log("Unable to connect to database");
  }
};
module.exports = connectDB;
