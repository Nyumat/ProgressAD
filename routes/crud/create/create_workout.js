import { User } from "../../../models/user.js";
import { Workout } from "../../../models/workout.js";
import { Router } from "express";
const router = Router();

router.post("/", async (req, res) => {
	const { username, workOutType, workOutIntensity } = req.body;
	try {
		let user = await User.findOne({ username: username });

		if (!user) {
			return res.status(400).json({ msg: "User does not exist" });
		}

		let workout = new Workout({
			username,
			workOutType,
			workOutIntensity,
			workoutStartTimestamp: Date.now(),
			machines: []
		});

		if (user.workouts.length > 0) {
			return res.status(400).json({ msg: "Workout already going on." });
		} else {
			user.workouts = [workout];
			await user.save();
			return res
				.status(200)
				.json({ msg: `Workout created for ${username} successfully!` });
		}
	} catch (error) {
		res.send(error);
	}
});

export default router;
