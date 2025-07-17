const { userModel } = require("../db");

const userMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  const user = userModel.findOne({ password, email });

  if (user) {
    const validuser = await bcrypt.compare(user.password, password);
    if (validuser) {
      next();
      res.send({
        msg: "logged in succesfully",
      });
    }
  } else
    res.send({
      msg: "not valid credentials",
    });
};

module.exports = { userMiddleware };
