import { User } from "../../models/user.js";
import { Router } from "express";
const router = Router();

router.post("/", async (req, res) => {
	let username = req.body.username;
	try {
		let user = await User.findOne({ username: username }).exec();

		return res.status(200).send(user);
	} catch (error) {
		return res.status(400).send(error);
	}
});

export default router;