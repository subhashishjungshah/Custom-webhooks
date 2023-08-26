require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
const User = require("./models/Users");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/create-user", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const newUser = await User.create({
      firstName,
      lastName,
    });

    if (newUser) {
      axios
        .post("http://localhost:3006/", newUser)
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the user",
      error: error.message,
    });
  }
});

// Server start function
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`Listening on Port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
