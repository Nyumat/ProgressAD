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

		if (!workout) {
			return res
				.status(406)
				.json({ msg: "You must start a workout before appending data." });
		}

		let strength_machines = workout.machines.filter(
			(machine) => machine.machine_type === "Strength"
		);

		if (strength_machines.length > 0) {
			for (let i = 0; i < strength_machines.length; i++) {
				if (strength_machines[i].machine_status === false) {
					return res
						.status(400)
						.json({ msg: `${user.username} is using a non-cardio machine.` });
				}
			}
		}

		let machine = workout.machines.find(
			(machine) => machine.machine_id === machine_id
		);

		if (!machine) {
			return res.status(400).json({ msg: "Machine does not exist." });
		} else {
			machine.distance = distance;
			machine.timeSpent = timeSpent;

			await user.save();

			return res.status(200).json({
				msg: `${machine.machine_name} updated successfully for ${username}!`
			});
		}
	} catch (error) {
		res.send(error);
	}
});

export default router;
