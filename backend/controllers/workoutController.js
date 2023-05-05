const Workout = require("../models/workoutModel");

const getAllWorkouts = async (req, res) => {
  const workout = await Workout.find().sort({ createdAt: -1 });
  res.json(workout);
};

const getWorkout = async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) {
    res.status(404).json({ message: "Workout not found" });
  } else {
    res.json(workout);
  }
};

const addWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  let emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!load) emptyFields.push("load");
  if (!reps) emptyFields.push("reps");
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    const workout = await Workout.create(req.body);
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const workout = await Workout.findOneAndDelete(req.params.id);
  if (!workout) {
    res.status(404).json({ message: "Workout not found" });
  } else {
    res.json(workout);
  }
};

const updateWorkout = async (req, res) => {
  const workout = await Workout.findOneAndUpdate(req.params.id, {
    ...req.body,
  });
  if (!workout) {
    res.status(404).json({ message: "Workout not found" });
  } else {
    res.json(workout);
  }
};

module.exports = {
  getAllWorkouts,
  getWorkout,
  addWorkout,
  deleteWorkout,
  updateWorkout,
};
