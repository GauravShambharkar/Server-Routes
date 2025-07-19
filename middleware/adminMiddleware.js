const { admin_jwt_secret } = require("../config");
const jwt = require("jsonwebtoken");

const jwt_Verification_Middleware = async (req, res, next) => {
  const { token } = req.body;

  const validToken = await jwt.verify(token, admin_jwt_secret);
  if (validToken) {
    next();
  } else {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { jwt_Verification_Middleware };
