const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!jwt.verify(token, process.env.JWT_SECRET)) {
    res.status(400);
    throw new Error("Could not authenticate");
  }
  const { email } = jwt.decode(token);
  req.userEmail = email;
  next();
};

module.exports = authenticate;
