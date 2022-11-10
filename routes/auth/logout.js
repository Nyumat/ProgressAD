import { User } from "../../models/user.js";
import { Machine, Workout } from "../../models/workout.js";
import { Router } from "express";
const router = Router();

router.patch("/", async (req, res) => {
	let username = req.body.username;
	try {
		let user = await User.findOne({ username: username }).exec();
		if (!user) {
			return res.status(400).send("User doesn't exist.");
		}

		user.logoutDateTime = Date.now();

		let workout = await Workout.findOne({ username: username });

		if (workout) {
			workout.workoutEndTimestamp = Date.now();
			user.savedWorkouts.push(workout);
			await Workout.deleteOne({ username: username });
		}

		let machines = await Machine.find({ username: username });
		if (machines) {
			await Machine.deleteMany({ username: username });
		}

		for (let i = 0; i < user.workouts.length; i++) {
			for (let j = 0; j < user.workouts[i].machines.length; j++) {
				await Machine.deleteOne({ _id: user.workouts[i].machines[j]._id });
			}
		}

		user.workouts = [];
		await user.save();

		res.status(200).json({
			msg: `User ${user.username} logged out successfully!`
		});
	} catch (error) {
		res.send(error);
	}
});

export default router;
