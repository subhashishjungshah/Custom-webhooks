require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/database");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Server start function
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Listening on Port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
