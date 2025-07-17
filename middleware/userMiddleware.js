const { userModel } = require("../db");
const bcrypt = require("bcrypt");

const userMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).send({ msg: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.send({ msg: "Invalid credentials" });
    }

    // Credentials valid, move to next middleware or controller
    next();
  } catch (err) {
    console.error("Error in userMiddleware:", err);
    res.status(500).send({ msg: "Internal server error" });
  }
};

module.exports = { userMiddleware };
