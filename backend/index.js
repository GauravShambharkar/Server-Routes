const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { databaseString } = require("./config");
const cors = require("cors");

mongoose.connect(databaseString);

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const userRoute = require("./Routes/route.User");
const adminRoute = require("./Routes/route.Admin");

app.use("/testuser", userRoute);
app.use("/testadmin", adminRoute);

const port = process.env.port || 3000;

const server = app.listen(port, () => {
  console.log("Server is running successfully");
});

server.on("error", (err) => {
  console.log("Server failed to start: " + err.message);
});
