//@ts-nocheck
import { Exercise } from "../../../models/workout.js";
import { Workout } from "../../../models/workout.js";
import User from "../../../models/user.js";
import { Router, Request, Response } from "express";
const router = Router();

router.patch("/", async (req: Request, res: Response) => {
	const { username, exercise_name } = req.body;

	try {
		let user = await User.findOne({ username: username });

		if (!user) {
			return res.status(400).json({ msg: "User does not exist." });
		}

		let workout = user.workouts[user.workouts.length - 1];

		let exercise = new Exercise({
			exercise_name
		});

		let workoutExercisesId = await User.findOne({ username }).select(
			"workoutExercises"
		);

		if (!workoutExercisesId) {
			return res.status(400).json({ msg: "No workout created." });
		}
		
		workout.workoutExercises.push(exercise);

		await user.save();

		return res.status(200).json({
			msg: `Exercise added successfully to ${username}'s workout!`,
			workout: user.workouts[user.workouts.length - 1]
		});
	} catch (error) {
		res.json(error);
	}
});

export default router;
