import { Router } from "express";
import { User } from "../../../models/user.js";
import { Dixon } from "../../../models/dixon.js";
const router = Router();

router.patch("/", async (req, res) => {
	let username = req.body.username;
	try {
		let user = await User.findOne({ username: username }).exec();
		if (!user) {
			return res.status(400).send("User doesn't exist.");
            }
            
            if (user.workouts.length === 0) {
                  return res.status(400).json({msg: `${user.username} has no current workout to end.`})
            }

		let machine_ids = user.workouts[user.workouts.length - 1].machines.map(
			(machine) => machine.machine_id
            );

            user.workouts[user.workouts.length - 1].machines.forEach((machine) => {
                  machine.machine_status = true;
            });

            Dixon.find({ machine_id: { $in: machine_ids } }, (err, machines) => {
                  if (err) {
                        return res.status(400).send(err);
                  } 

                  machines.forEach((machine) => {
                        machine.machine_status = true;
                        machine.save();
                  });
            });


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
