const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

app.get("/user", (req, res) => {
  res.send({
    msg: "User access",
  });
});

app.get("/admin", (req, res) => {
  res.send({
    msg: "Admin access",
  });
});

app.post("/admin", (req, res) => {
  const { name, email } = req.body;
  fs.appendFileSync("adminData.txt", `{\nname: ${name},\nemail: ${email}\n}\n`);
  res.send({
    name,
    email,
  });
});

app.get("/course", (req, res) => {
  res.send({
    msg: "Course access",
  });
});

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log("server is running succesfully");
});
