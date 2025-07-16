const express = require("express");
const fs = require("fs");

const userRoute = express.Router();

const { userModel } = require("../db");

userRoute.get("/", (req, res) => {
  // res.send(fs.readFileSync("userData.json"));
  res.send({
    message: "Hello from user route",
  });
});

userRoute.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  await userModel.create({
    name,
    email,
    password,
  });
  // const userFound = fs.readFileSync("userData.json");
  // if (userFound.includes(email)) {
  //   res.send({ message: "User already exists" });
  // } else {
  //   fs.appendFileSync(
  //     "userData.json",
  //     `{\n "name" : ${JSON.stringify(name)},\n "email" : ${JSON.stringify(
  //       email
  //     )} \n},\n`
  //   );
  // }

  res.send({
    msg: "new user registered succesfully",
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
