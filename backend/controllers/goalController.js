const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user._id });
  res.json(goals);
});

// @desc    Get goal
// @route   GET /api/goals/:id
// @access  Private
const getGoal = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Please provide id");
  }
  const goal = await Goal.findById(req.params.id);
  res.json(goal);
});

// @desc    SET goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({ user: req.user._id, text: req.body.text });
  res.status(201).json(goal);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findOne({ _id: req.params.id });
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  await Goal.updateOne(
    { _id: req.params.id, user: req.user._id },
    { ...req.body }
  );
  res.json({ message: `Updated Goal ${req.params.id}` });
});

// @desc    Delete goals
// @route   DEL /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const result = await Goal.deleteOne({
    _id: req.params.id,
    user: req.user._id,
  });
  res.json(result);
});

module.exports = { getGoals, getGoal, setGoal, updateGoal, deleteGoal };
