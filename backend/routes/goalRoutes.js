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

router.route("/", authenticate).get(getGoals).post(setGoal);
router
  .route("/:id", authenticate)
  .get(getGoal)
  .put(updateGoal)
  .delete(deleteGoal);

module.exports = router;
