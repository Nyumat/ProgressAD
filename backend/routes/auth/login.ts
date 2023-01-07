import { compare } from "bcrypt";
import joi from "joi";
import { Router } from "express";
import generateAuthToken from "../../utils/generateToken.js";
import User from "../../models/user.js";
const router = Router();

router.post("/", async (req, res) => {
	const schema = joi.object({
		username: joi.string().min(3).max(200).required(),
		pin: joi.number().min(0).max(9999).required()
	});

	const { error } = schema.validate(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({
		username: req.body.username
	});

	if (!user) return res.status(402).send("User doesn't exist.");

	const { pin } = req.body;

	if (pin.toString().length > 4 || pin.toString().length < 4) {
		return res.status(405).send("Pin must be 4 digits.");
	}

	const validPassword = await compare(
		req.body.pin.toString(),
		user.pin.toString()
	);

	if (!validPassword) return res.status(401).send("Incorrect pin. Try again.");

	user.updatedAt = new Date();
	await user.save();

	const token = generateAuthToken({
		_id: user._id,
		username: user.username,
		key: process.env.JWT_SECRET_KEY as string
	});

	res.status(200).json({
		msg: `User ${user.username} logged in successfully!`,
		token: token
	});
});

export default router;
