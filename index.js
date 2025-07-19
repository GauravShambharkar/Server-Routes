const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { databaseString } = require("./config");
const cors = require("cors");

mongoose.connect(databaseString);

app.use(express.json());
app.use(cors());

const userRoute = require("./Routes/testUser");
const adminRoute = require("./Routes/testAdmin");

app.use("/testuser", userRoute);
app.use("/testqdmin", adminRoute);

const port = process.env.port || 3000;

const server = app.listen(port, () => {
  console.log("Server is running successfully");
});


server.on("error", (err) => {
  console.log("Server failed to start: " + err.message);
});
