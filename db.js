const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: String,
  email: String,
  password: String,
});

const adminSchema = new schema({
  name: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("test_User", userSchema);
const adminModel = mongoose.model("test_Admin", adminSchema);

module.exports = {
  userModel,
  adminModel,
};
