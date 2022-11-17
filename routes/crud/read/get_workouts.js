import { User } from "../../../models/user.js";
import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
	const username = req.query.username;
	try {
		let user = await User.findOne({ username: username }).exec();

		if (!user) {
			res.status(400).json({ msg: "User doesn't exist." });
		}

		let currentWorkout = user.workouts[user.workouts.length - 1];
		let savedWorkouts = user.savedWorkouts;

		return res.status(200).json({
			msg: `${user.username}'s workout data found successfully!`,
			currentWorkout: currentWorkout,
			savedWorkouts: savedWorkouts
		});
	} catch (error) {
		return res.status(400).send(error);
	}
});

export default router;
