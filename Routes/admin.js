const express = require("express");
const fs = require("fs");

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

module.exports = adminRoute;
