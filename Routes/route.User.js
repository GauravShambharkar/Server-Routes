const express = require("express");
const userRoute = express.Router();
// const { registerUser, loginUser, updateUser, jwtValid, deleteUser } = require("../controllers/userController");
const userController = require("../controllers/userController");
const { userMiddleware, jwt_Verification_Middleware} = require("../middleware/userMiddleware");
const { userModel } = require("../db");

userRoute.get("/", async (req, res)  => {
  // res.send(fs.readFileSync("userData.json"));
  const userData = await userModel.find()
  res.send({
  data: userData,
  });
});



userRoute.post("/register", userController.registerUser);

userRoute.post("/login", userMiddleware, userController.loginUser);
userRoute.post("/login/token", jwt_Verification_Middleware ,  userController.jwtValid );


userRoute.put("/update", userController.updateUser);
userRoute.delete('/delete', userMiddleware , userController.deleteUser)

module.exports = userRoute;
