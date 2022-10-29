const express = require("express");

const authenticate = require("../middleware/authMiddlerware");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", authenticate, getMe);

module.exports = router;
