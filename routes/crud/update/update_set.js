import { User } from "../../../models/user.js";
import { Router } from "express";
const router = Router();

router.put("/", async (req, res) => {
	try {
		const { username, reps, weight, machine_id } = req.body;

		let user = await User.findOne({ username: username });

		if (!user) {
			return res.status(400).json({ msg: "User does not exist." });
		}

		let workout = user.workouts[user.workouts.length - 1];

		let machine = workout.machines.find(
			(machine) => machine.machine_id === machine_id
		);

		let cardio_machines = workout.machines.filter(
			(machine) => machine.machine_type === "Cardio"
		);

		if (cardio_machines.length > 0) {
			for (let i = 0; i < cardio_machines.length; i++) {
				if (cardio_machines[i].machine_status === false) {
					return res
						.status(400)
						.json({ msg: `${user.username} is using a non-strength machine.` });
				}
			}
		}

		if (!machine) {
			return res.status(400).json({ msg: `${user.username} is not using any strength machines right now.` });
		} else {
			machine.sets.push({
				reps: reps,
				weight: weight
			});

			await user.save();

			return res.status(200).json({
				msg: `Set added successfully to ${machine.machine_name} for ${username}!`
			});
		}
	} catch (error) {
		res.send(error);
	}
});

export default router;
