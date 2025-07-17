const { userModel } = require("../db");

const userMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  const user = userModel.findOne({email})

  if(user){
        
  }
};

module.exports = {
  userMiddleware,
};
