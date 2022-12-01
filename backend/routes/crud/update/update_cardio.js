import { User } from "../../../models/user.js";
import { Router } from "express";
const router = Router();

router.put("/", async (req, res) => {
	try {
		const { username, distance, timeSpent, machine_id } = req.body;

		let user = await User.findOne({ username: username });

		if (!user) {
			return res.status(400).json({ msg: "User does not exist." });
		}

		let workout = user.workouts[user.workouts.length - 1];

		let machine = workout.machines.find(
			(machine) => machine.machine_id === machine_id
		);

		if (!machine) {
			return res.status(400).json({ msg: "Machine does not exist." });
		}

		machine.distance = distance;
		machine.timeSpent = timeSpent;

		await user.save();

		res.status(200).json({ msg: "Cardio added successfully.", workout });
	} catch (error) {
		res.send(error);
	}
});

export default router;
