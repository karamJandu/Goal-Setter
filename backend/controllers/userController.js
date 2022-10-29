const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// @desc    Register new user
// @route   POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide name, email and password");
  }

  const saltRounds =
    (process.env.BCRYPT_SALT_ROUNDS && Number(process.env.SALT_ROUNDS)) || 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });
  res.json(user);
});

// @desc    Authenticate user
// @route   POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send(400);
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.send(400);
    throw new Error("Please provide correct credentials");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    res.send(400);
    throw new Error("Please provide correct credentials");
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
  res.json({ token });
});

// @desc    Get user data
// @route   GET /api/users/me
// @access Public
const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, getMe };
