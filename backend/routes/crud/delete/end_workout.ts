import { Router, Request, Response }  from "express";
import User from "../../../models/user.js";
import Dixon from "../../../models/dixon.js";
const router = Router();

router.patch("/", async (req: Request, res: Response) => {
	let username = req.body.username;
	try {
		let user = await User.findOne({ username: username }).exec();
		if (!user) {
			return res.status(400).send("User doesn't exist.");
		}

		if (user.workouts.length === 0) {
			return res
				.status(400)
				.json({ msg: `${user.username} has no current workout to end.` });
		}

		let machine_ids = User.find(
			{ username },
			{
				"workouts.$[workout].machines.machine_id": 1
			}
		);

		User.updateMany(
			{
				username
			},
			{
				$set: {
					"workouts.$[workout].machines.$[machine].machine_status": true
				}
			}
		);

		let ids = Dixon.find({ machine_id: { $in: machine_ids } }, (err: any, machines: any[]) => {
			if (err) {
				return res.status
			}
			return machines.map((machine) => machine._id);
			
		});

		let machines = await Dixon.find({ machine_id: { $in: ids } }).exec();
		
		for (let i = 0; i < machines.length; i++) {
			machines[i].machine_status = true;
			machines[i].save();
		}

		User.updateOne(
			{
				username
			},
			{
				$set: {
					"workouts[0].workoutEndTimestamp": Date.now()
				}
			}
		).exec();

		user.savedWorkouts.push(user.workouts[0]);
		user.workouts.pop();

		await user.save();

		res.status(200).json({
			msg: `User ${user.username} workout ended successfully!`,
			savedWorkouts: user.savedWorkouts
		});
	} catch (error) {
		res.send(error);
	}
});

export default router;
