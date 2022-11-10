import { User } from "../../../models/user.js";
import { Workout, Machine } from "../../../models/workout.js";
import { Router } from "express";
const router = Router();

router.post("/", async (req, res) => {
	try {
		const { username, machine_name, machine_type, is_available } = req.body;

		let isAvailable = is_available === "true" ? true : false;

		const user = await User.findOne({ username: username });

		if (!user) {
			return res.status(400).json({ msg: "User does not exist." });
		}

		if (machine_type === "Cardio") {
			user.workouts[user.workouts.length - 1].machines.push({
				username: username,
				machine_name: machine_name,
				machine_type: machine_type,
				is_available: isAvailable,
				sets: null
			});

			await user.save();

			return res
				.status(200)
				.json({ msg: "Cardio Machine added successfully." });
		} else if (machine_type === "Strength") {
			user.workouts[user.workouts.length - 1].machines.push({
				username: username,
				machine_name: machine_name,
				machine_type: machine_type,
				is_available: isAvailable,
				sets: []
			});

			await user.save();

			return res
				.status(200)
				.json({ msg: "Strength Machine added successfully." });
		} else {
			return res.status(400).json({ msg: "Machine type not found." });
		}
	} catch (error) {
		res.send(error);
	}
});

export default router;
