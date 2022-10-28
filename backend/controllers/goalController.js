const asyncHandler = require("express-async-handler");

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  res.json({ message: "Get Goals" });
});

// @desc    Get goal
// @route   GET /api/goals/:id
// @access  Private
const getGoal = asyncHandler(async (req, res) => {
  res.json({ message: "Get Goals" });
});

// @desc    SET goal
// @route   SET /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  console.log(req.body);
  res.json({ message: "Get Goals" });
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  res.json({ message: "Get Goals" });
});

// @desc    Delete goals
// @route   DEL /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.json({ message: "Get Goals" });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
