import { User } from "../../../models/user.js";
import { Router } from "express";
const router = Router();

router.put("/", async (req, res) => {
	try {
		const { username, distance, timeSpent, machine_name } = req.body;

		let user = await User.findOne({ username: username });

		if (!user) {
			return res.status(400).json({ msg: "User does not exist." });
		}

		let workout = user.workouts[user.workouts.length - 1];

		if (!workout) {
			return res
				.status(406)
				.json({ msg: "You must start a workout before appending data." });
		}

		let machine = workout.machines.find(
			(machine) => machine.machine_name === machine_name
		);

		if (!machine) {
			return res.status(400).json({ msg: "Machine does not exist." });
		} else {
			machine.distance = distance;
			machine.timeSpent = timeSpent;

			await user.save();

			return res.status(200).json({
				msg: `${machine_name} updated successfully for ${username}!`
			});
		}
	} catch (error) {
		res.send(error);
	}
});

export default router;
