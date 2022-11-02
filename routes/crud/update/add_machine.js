import { User } from "../../../models/user.js";
import { Workout, Machine } from "../../../models/workout.js";
import { Router } from "express";
const router = Router();

router.put("/", async (req, res) => {
	try {
		const { username, machine_name, machine_type, is_available } = req.body;

		let machine = new Machine({
			username: username,
			machine_name: machine_name,
			machine_type: machine_type,
			is_available: is_available
		});

		await machine.save();

		let user = await User.findOne({ username: username });
		let workout = await Workout.findOne({ username: username });

		workout.machines.push(machine);
		await workout.save();

		await User.findOneAndUpdate(
			{ "username": username, "workouts._id": workout._id },
			{ $push: { "workouts.$.machines": machine } }
		);

		res
			.status(200)
			.send(`${machine.machine_name} added to ${user.username}'s workout!`);
	} catch (error) {
		res.send(error);
	}
});

export default router;
