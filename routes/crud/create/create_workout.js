import { User } from "../../../models/user.js";
import { Workout } from "../../../models/workout.js";
import { Router } from "express";
const router = Router();

router.post("/", async (req, res) => {
	try {
		let workout = await Workout.findOne({ username: req.body.username });

		if (workout)
			return res
				.status(406)
				.send(`Error: \nWorkout already started for ${req.body.username}`);

		const { username, workOutType, workOutIntensity } = req.body;

		workout = new Workout({
			username,
			workOutType,
			workOutIntensity,
			workoutStartTimestamp: Date.now(),
			workoutEndTimestamp: null,
			workoutDuration: null,
			machines: [],
			machinesUsed: null,
			effortLevel: 0,
			tirednessLevel: 0
		});

		await workout.save();

		let user = await User.findOne({ username: username });

		if (!user) {
			return res.status(400).json({ msg: "User does not exist." });
		}

		user.workouts.push(workout);

		await user.save();

		res
			.status(200)
			.json({ msg: `Workout created for ${user.username} successfully!` });
	} catch (error) {
		res.send(error);
	}
});

export default router;
