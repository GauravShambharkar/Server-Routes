const mongoose = require("mongoose");
const { userSchema } = require("./Schemas/userSchema");
const { adminSchema } = require("./Schemas/adminSchema");

const userModel = mongoose.model("test_User", userSchema);
const adminModel = mongoose.model("test_Admin", adminSchema);

module.exports = {
  userModel,
  adminModel,
};
