import User from "../../models/user.js";
import { Router } from "express";
import Dixon from "../../models/dixon.js";
const router = Router();

router.patch("/", async (req, res) => {
	let username = req.body.username;
	try {
		let user = await User.findOne({ username: username }).exec();
		if (!user) {
			return res.status(400).send("User doesn't exist.");
		}

		user.updatedAt = new Date();
		
		// Delete all dixons associated with the user
		await Dixon.deleteMany({ user: user._id });

		await user.save();

		res.status(200).json({
			msg: `User ${user.username} logged out successfully!`
		});
	} catch (error) {
		res.send(error);
	}
});

export default router;
