const express = require("express");
const app = express();

app.use(express());

app.get("/", (req, res) => {
  res.send({
    msg: "route designed for user access",
  });
});

app.get("/admin", (req, res) => {
  res.send({
    msg: "route designed for admin access",
  });
});

app.get("/course", (req, res) => {
  res.send({
    msg: "route designed for course access",
  });
});

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log("server is running succesfully");
});
