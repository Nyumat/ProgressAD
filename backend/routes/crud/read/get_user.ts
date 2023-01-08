import { Router, Request, Response }  from "express";
import User from "../../../models/user.js";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
	const username = req.query.username;
	try {
		let user = await User.findOne({ username: username }).exec();
		
		if (!user) {
			return res.status(400).json({ msg: "User does not exist." });
		}

		return res.status(200).json({
			msg: `User ${user.username} found successfully!`,
			user: user
		});
	} catch (error) {
		return res.status(400).send(error);
	}
});

export default router;
