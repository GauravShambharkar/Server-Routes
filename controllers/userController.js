const { userModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user_jwt_secret } = require("../config");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userModel.findOne({ email });
  const hashedPass = bcrypt.hashSync(password, 10);

  if (user) {
    res.status(500).send({
      message: "User already exists",
    });
  } else {
    await userModel.create({
      name,
      email,
      password: hashedPass,
    });
  }

  // const user = fs.readFileSync("userData.json");
  // if (user.includes(email)) {
  //   res.send({ message: "User already exists" });
  // } else {
  //   fs.appendFileSync(
  //     "userData.json",
  //     `{\n "name" : ${JSON.stringify(name)},\n "email" : ${JSON.stringify(
  //       email
  //     )} \n},\n`
  //   );
  // }

  res.send({
    msg: `${name} your account is created succesfully`,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await userModel.findOne({ email });
  if (foundUser) {
    const valid_Pass = await bcrypt.compare(password, foundUser.password);
    if (valid_Pass) {
      const token = jwt.sign({ id: foundUser._id }, user_jwt_secret);
      res.send({
        token: token,
        // msg: "logged in succesfully",
      });
    } else {
      res.status(500).send({ message: "Invalid password" });
    }
  } else {
    res.send({
      msg: "user not found",
    });
  }
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    user.name = name;
    await user.save();
    return res.send({ msg: "user updated succesfully", userId: user._id });
  } else {
    return res.send({ msg: "user not found" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
};
