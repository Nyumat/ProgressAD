import { User } from "../../models/user.js";
import { Router } from "express";
import { Dixon } from "../../models/dixon.js";
const router = Router();

router.patch("/", async (req, res) => {
	let username = req.body.username;
	try {
		let user = await User.findOne({ username: username }).exec();
		if (!user) {
			return res.status(400).send("User doesn't exist.");
		}

		let machine_ids = user.workouts[user.workouts.length - 1].machines.map(
			(machine) => machine.machine_id
		);
		let dixon = await Dixon.findOne({
			machine_id: { $in: machine_ids }
		}).exec();

		if (dixon) {
			dixon.machine_status = true;
			await dixon.save();
		}

		user.workouts[0].workoutEndTimestamp = Date.now();

		let workoutDuration =
			user.workouts[0].workoutEndTimestamp -
			user.workouts[0].workoutStartTimestamp;

		workoutDuration = (workoutDuration / 60000).toFixed(2);

		user.workouts[0].workoutDuration = workoutDuration;

		// possibly change this to handle sudden logout
		user.workouts[0].machines.forEach((machine) => {
			machine.machine_status = true;
		});

		user.savedWorkouts.push(user.workouts[0]);
		user.workouts.pop();

		user.logoutDateTime = Date.now();

		await user.save();

		res.status(200).json({
			msg: `User ${user.username} logged out successfully!`
		});
	} catch (error) {
		res.send(error);
	}
});

export default router;
