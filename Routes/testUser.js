const express = require("express");
const fs = require("fs");
const userRoute = express.Router();
const { userModel } = require("../db");
const { mongoose } = require("mongoose");
const { registerUser, loginUser } = require("../controllers/userController");
const { userMiddleware } = require("../middleware/userMiddleware");

userRoute.get("/", (req, res) => {
  // res.send(fs.readFileSync("userData.json"));
  res.send({
    message: "Hello from user route",
  });
});

userRoute.post("/register", registerUser);

userRoute.post("/login", loginUser);

module.exports = userRoute;
