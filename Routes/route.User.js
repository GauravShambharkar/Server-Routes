const express = require("express");
const userRoute = express.Router();
const { registerUser, loginUser, updateUser, jwtValid, deleteUser } = require("../controllers/userController");
const { userMiddleware, jwt_Verification_Middleware} = require("../middleware/userMiddleware");
const { userModel } = require("../db");

userRoute.get("/", async (req, res)  => {
  // res.send(fs.readFileSync("userData.json"));
  const userData = await userModel.find()
  res.send({
  data: userData,
  });
});



userRoute.post("/register", registerUser);

userRoute.post("/login", userMiddleware, loginUser);
userRoute.post("/login/token", jwt_Verification_Middleware, jwtValid );


userRoute.put("/update", updateUser);
userRoute.delete('/delete', userMiddleware ,deleteUser)

module.exports = userRoute;
