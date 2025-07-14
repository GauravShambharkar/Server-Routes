const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { databaseString } = require("./config");

// mongoose.connect(databaseString);

app.use(express.json());

const userRoute = require("./Routes/user");
const adminRoute = require("./Routes/admin");

app.use("/user", userRoute);
app.use("/admin", adminRoute);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log("server is running succesfully");
});
