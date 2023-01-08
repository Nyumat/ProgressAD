
import User from "../../../models/user.js";
import { Request, Response, Router }  from "express";
import Dixon from '../../../models/dixon.js';
import { Machine } from '../../../models/workout.js';
const router = Router();

router.put("/", async (req : Request, res : Response) => {
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
		
		let user_machine = User.findOne({ username: username, "workouts.machines.machine_id": machine_id });

		let machine_status = machine.machine_status;
		
		if (!user_machine) {
			return res.status(400).json({ msg: "Machine does not exist." });
		}

		if (machine_status === false) {
			machine_status = true;
		} else {
			machine_status = false;
		}

		await user.save();

		let machines = await Dixon.find({});

		res.status(200).json({
			msg: "Machine status updated.",
			machines: machines
		});

		machine.machine_status = machine_status;
		await machine.save();
	} catch (error) {
		res.send(error);
	}
});

export default router;
