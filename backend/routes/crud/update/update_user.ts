// @ts-nocheck
import User from "../../../models/user.js";
import { Router, Request, Response }  from "express";
const router = Router();

router.put("/", async (req: Request, res: Response) => {
	try {
		const {
			old_username,
			username,
			weight,
			height,
			BMI,
			age,
			firstName,
			lastName
		} = req.body;

		const old_user = await User.findOne({
			username: old_username
		});

		if (!old_user) {
			return res.status(400).json({
				msg: "User does not exist"
			});
		}

		const user = await User.findOne({
			username: username
		});

		if (old_username !== username) {
			old_user.username = username;
			old_user.weight = weight;
			old_user.height = height;
			old_user.BMI = BMI;
			old_user.age = age;
			old_user.firstName = firstName;
			old_user.lastName = lastName;
			old_user.save();

			old_user.workouts.forEach(async (workout) => {
				workout.username = username;
				workout.machines.forEach(async (machine: { username: any; save: () => any; }) => {
					machine.username = username;
					await machine.save();
				});
				workout.save();
			});

			old_user.savedWorkouts.forEach(async (workout) => {
				workout.username = username;
				workout.machines.forEach(async (machine: { username: any; save: () => any; }) => {
					machine.username = username;
					await machine.save();
				});
				workout.save();
			});

			return res.status(200).send({
				msg: "New Username Appled.",
				user: old_user
			});
		} else {
			if (!user) {
				return res.status(400).json({
					msg: "User does not exist"
				});
			}

			user.weight = weight;
			user.height = height;
			user.BMI = BMI;
			user.age = age;
			user.firstName = firstName;
			user.lastName = lastName;
			await user.save();

			return res.status(200).send({
				msg: "User profile updated.",
				user: user
			});
		}
	} catch (error) {
		res.send(error);
	}
});

export default router;
