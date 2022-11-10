import { User } from "../../../models/user.js";
import { Workout, Machine } from "../../../models/workout.js";
import { Router } from "express";
const router = Router();

router.put("/", async (req, res) => {
	try {
		const { username, reps, weight, machine_name } = req.body;

		let user = await User.findOne({ username: username });

		if (!user) {
			return res.status(400).json({ msg: "User does not exist." });
		}

		let workout = user.workouts[user.workouts.length - 1];

		let machine = workout.machines.find(
			(machine) => machine.machine_name === machine_name
		);

		if (!machine) {
			return res.status(400).json({ msg: "Machine does not exist." });
		} else {
			machine.sets.push({
				reps: reps,
				weight: weight
			});

			await user.save();

			return res.status(200).json({
				msg: `Set added successfully to ${machine_name} for ${username}!`
			});
		}
	} catch (error) {
		res.send(error);
	}
});

export default router;
