require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const connectDB = require("./config/database");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", async (req, res) => {
  console.log("web hooked triggered");
  console.log(req.body);
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
