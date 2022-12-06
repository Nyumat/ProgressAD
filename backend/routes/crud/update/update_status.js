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

		const user_workout = user.workouts[0];
		const user_machine = user_workout.machines.find(
			(machine) => machine.machine_id === machine_id
		);

		if (user_machine.machine_status === false) {
			user_machine.machine_status = true;
		} else {
			user_machine.machine_status = false;
		}

		await user.save();

		let machines = await Dixon.find({});

		res.status(200).json({
			msg: "Machine status updated.",
			machines: machines
		});

		machine.machine_status = user_machine.machine_status;
		await machine.save();
	} catch (error) {
		res.send(error);
	}
});

export default router;
