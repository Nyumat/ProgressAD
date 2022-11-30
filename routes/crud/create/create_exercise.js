import { Exercise } from "../../../models/workout.js";
import { Workout } from "../../../models/workout.js";
import { User } from "../../../models/user.js";
import { Router } from "express";
const router = Router();

router.post("/", async (req, res) => {
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
