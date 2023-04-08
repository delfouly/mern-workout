const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");
const workoutController = require("../controllers/workoutController");

router.get("/", workoutController.getAllWorkouts);

router.get("/:id", workoutController.getWorkout);

router.post("/", workoutController.addWorkout);

router.delete("/:id", workoutController.deleteWorkout);

router.patch("/:id", workoutController.updateWorkout);

module.exports = router;
