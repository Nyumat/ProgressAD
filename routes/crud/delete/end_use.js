import { User } from "../../../models/user.js";
import { Dixon } from "../../../models/dixon.js";
import { Router } from "express";
const router = Router();

router.put("/", async (req, res) => {
	try {
		const { machine_id, username } = req.body;

		let user = await User.findOne({ username: username });

		if (!user) {
			return res.status(400).json({ msg: "User does not exist." });
		}

		let machine = await Dixon.findOne({ machine_id: machine_id });

		if (!machine) {
			return res.status(400).json({ msg: "Machine does not exist." });
		}

		if (user.workouts.length === 0) {
			return res
				.status(400)
				.json({ msg: `${user.username} has no current workout.` });
		}

		if (user.workouts[0].machines.length === 0) {
			return res
				.status(400)
				.json({ msg: `${user.username} has no machines in workout.` });
		}

		let user_workout = user.workouts[0];
		let user_machines = user_workout.machines;

		if (machine.machine_id !== machine_id) {
			return res
				.status(400)
				.json({ msg: "Cannot modify machine you're not using." });
		}

		if (machine.machine_status === true && machine.machine_id === machine_id) {
			return res.status(200).json({ msg: "Machine is already checked out." });
		}

		machine.machine_status = true;
		await machine.save();

		user_machines[user_machines.length - 1].machine_status = true;

		await user.save();

		return res.status(200).json({
			msg: `${machine.machine_name} has been checked out for ${username}!`
		});
	} catch (error) {
		res.send(error);
	}
});

export default router;
