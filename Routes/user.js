const express = require("express");
const fs = require("fs");

const userRoute = express.Router();

const { userModel } = require("../db");

userRoute.get("/", (req, res) => {
  res.send(fs.readFileSync("userData.json"));
});

userRoute.post("/register", async (req, res) => {
  const { name, email } = req.body;

  //   await userModel.create({
  //     name,
  //     email,
  //   });
  const userFound = fs.readFileSync("userData.txt");
  if (userFound.includes(email)) {
    res.send({ message: "User already exists" });
  } else {
    fs.appendFileSync(
      "userData.json",
      `{\n name : ${name},\n email : ${email} \n}\n`
    );
  }

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
