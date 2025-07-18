const { userModel } = require("../db");
const bcrypt = require("bcrypt");
const { userMiddleware } = require("../middleware/userMiddleware");

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
    res.send({
      msg: "logged in succesfully",
    });
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
    return res.send({ msg: "user updated succesfully" });
  } else {
    return res.send({ msg: "user not found" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
};
