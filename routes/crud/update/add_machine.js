import { User } from "../../../models/user.js";
import { Router } from "express";
import { Dixon } from "../../../models/dixon.js";
const router = Router();

router.post("/", async (req, res) => {
	try {
		const { username, machine_id } = req.body;
		let machine_type = null;
		let machine_name = null;
		let is_available = null;

		let dixon = await Dixon.findOne({ machine_id: machine_id }).exec();

		if (!dixon) {
			return res.status(400).json({ msg: "Machine does not exist at Dixon" });
		}

		machine_type = dixon.machine_type;
		machine_name = dixon.machine_name;
		is_available = dixon.machine_status;

		if (!is_available) {
			return res.status(400).json({ msg: "Machine is currently in use" });
		}

		const user = await User.findOne({ username: username });

		if (!user) {
			return res.status(400).json({ msg: "User does not exist." });
		}

		if (user.workouts.length === 0) {
			return res
				.status(400)
				.json({ msg: "You must start a workout to use a machine." });
		}

		let user_workout = user.workouts[user.workouts.length - 1];
		let user_machines = user_workout.machines;

		for (let i = 0; i < user_machines.length; i++) {
			if (user_machines[i].machine_status === false) {
				return res
					.status(400)
					.json({ msg: `${user.username} is already using a machine.` });
			}
		}

		if (machine_type === "Cardio") {
			user.workouts[user.workouts.length - 1].machines.push({
				username: username,
				machine_name: machine_name,
				machine_type: machine_type,
				machine_id: machine_id,
				machine_status: false,
				sets: null
			});

			await user.save();

			dixon.machine_status = false;
			await dixon.save();

			return res
				.status(200)
				.json({ msg: `${machine_name} added successfully.` });
		} else if (machine_type === "Strength") {
			user.workouts[user.workouts.length - 1].machines.push({
				username: username,
				machine_name: machine_name,
				machine_type: machine_type,
				machine_id: machine_id,
				machine_status: false,
				sets: []
			});

			await user.save();

			dixon.machine_status = false;
			await dixon.save();

			return res
				.status(200)
				.json({ msg: `${machine_name} added successfully.` });
		} else {
			return res.status(400).json({ msg: "Machine type not found." });
		}
	} catch (error) {
		res.send(error);
	}
});

export default router;
