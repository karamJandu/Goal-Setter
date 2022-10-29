const express = require("express");
const authenticate = require("../middleware/authMiddlerware");

const router = express.Router();
const {
  getGoals,
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

router.route("/").get(authenticate, getGoals).post(authenticate, setGoal);
router
  .route("/:id")
  .get(authenticate, getGoal)
  .put(authenticate, updateGoal)
  .delete(authenticate, deleteGoal);

module.exports = router;
