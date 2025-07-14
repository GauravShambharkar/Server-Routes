const express = require("express");
const fs = require("fs");

const userRoute = express.Router();

const { userModel } = require("../db");

userRoute.get("/", (req, res) => {
  res.send({
    message: "Welcome to user route",
  });
});

userRoute.post("/register", async (req, res) => {
  const { name, email } = req.body;

  await userModel.create({
    name,
    email,
  });

  res.send({
    msg: "registered succesfully",
  });
});

userRoute.post("/login", async (req, res) => {
  const { name, email } = req.body;
  const foundUser = await userModel.findOne(email);
  if (foundUser) {
    res.send({
      msg: "logged in succesfully",
    });
  }
});

module.exports = userRoute;
