const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { admin_jwt_secret } = require("../config");
const adminRoute = express.Router();
const { adminModel } = require("../db");

adminRoute.get("/", (req, res) => {
  res.send({
    msg: "Welcome to Admin Dashboard",
  });
});

adminRoute.post("/register", async (req, res) => {
  const { name, email } = req.body;

  // await adminModel.create({
  //   name,
  //   email,
  // });

  res.send({
    msg: "admin account created seccsesfully ",
  });
});

adminRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await adminModel.findOne({ email });
  if (user) {
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      const token = await jwt.sign({ id: user._id }, admin_jwt_secret);
      res.send({
        token: token,
      });
    } else {
      res.send({ msg: "invalid password" });
    }
  } else {
    res.send({ msg: "invalid email" });
  }
});

module.exports = adminRoute;
