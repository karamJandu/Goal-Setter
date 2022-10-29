const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!jwt.verify(token, process.env.JWT_SECRET)) {
    res.status(400);
    throw new Error("Could not authenticate");
  }
  const { email } = jwt.decode(token);
  const user = await User.findOne({ email }).select("-password");
  req.user = user;
  next();
};

module.exports = authenticate;
