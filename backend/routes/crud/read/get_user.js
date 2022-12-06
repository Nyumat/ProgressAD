import { User } from "../../../models/user.js";
import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
	const username = req.query.username;
	try {
		let user = await User.findOne({ username: username }).exec();

		return res.status(200).json({
			msg: `User ${user.username} found successfully!`,
			user: user
		});
	} catch (error) {
		return res.status(400).send(error);
	}
});

export default router;
