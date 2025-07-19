const express = require("express");
const userRoute = express.Router();
const { registerUser, loginUser, updateUser } = require("../controllers/userController");
const { userMiddleware, jwt_Verification_Middleware } = require("../middleware/userMiddleware");

userRoute.get("/", (req, res) => {
  // res.send(fs.readFileSync("userData.json"));
  res.send({
    message: "Hello from user route",
  });
});



userRoute.post("/register", registerUser);

userRoute.post("/login", userMiddleware, loginUser);
userRoute.post("/token", jwt_Verification_Middleware, loginUser);


userRoute.put("/update", updateUser);

module.exports = userRoute;
