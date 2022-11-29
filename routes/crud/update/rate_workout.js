import { User } from "../../../models/user.js";
import { Router } from "express";
const router = Router();

router.patch("/", async (req, res) => {
	const { username, effortLevel, tirednessLevel } = req.body;
	try {
		let user = await User.findOne({ username: username });

		if (!user) {
			return res.status(400).json({ msg: "User does not exist" });
		}

		let user_workout = user.workouts[0];

		user_workout.effortLevel = effortLevel;
		user_workout.tirednessLevel = tirednessLevel;

		await user.save();

		return res.status(200).json({
			msg: `Workout rated for ${username} successfully!`
		});
	} catch (error) {
		res.status(400).json({ msg: error });
	}
});

export default router;