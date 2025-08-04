const { userModel } = require("../Models/models");
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

  const user = await userModel.findOne({ email });
  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    const token = await jwt.sign({ id: user._id }, user_jwt_secret);
    if (token) {
      res.send({
        token: token,
      });
    } else {
      res.status(500).send({
        message: "Failed to generate token",
      });
    }
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
};

const jwtValid = async (req, res) => {
  res.send({
    msg: "Token is valid",
  });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    await userModel.updateOne({ email }, { email: email }, { new: true });
    return res.send({ msg: "user updated succesfully", userId: user._id });
  } else {
    return res.send({ msg: "user not found" });
  }
};

const deleteUser = async (req, res) => {
  const { email, password } = req.body;
  const valid = await userModel.findOne({ email });
  if (valid) {
    const validPass = await bcrypt.compare(password, valid.password);
    if (validPass) {
      await userModel.findOneAndDelete(valid._id);
      res.send({
        msg: "user deleted successfully",
      });
    } else {
      res.status(401).send({ msg: "Invalid password" });
    }
  } else {
    res.status(404).send({ msg: "User not found" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  jwtValid,
  updateUser,
  deleteUser,
};
