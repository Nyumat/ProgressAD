import { genSalt, hash } from "bcrypt";
import { User } from "../../models/user.js";
import joi from "joi";
import { Router } from "express";
import generateAuthToken from "../../utils/generateToken.js";
const router = Router();

router.post("/", async (req, res) => {
	const schema = joi.object({
		username: joi.string().min(3).max(200).required(),
		pin: joi.number().min(0).max(9999).required()
	});

	const { error } = schema.validate(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ username: req.body.username });
	if (user) return res.status(406).send("User already exists.");

	const { username, pin } = req.body;

	if (pin.toString().length > 4 || pin.toString().length < 4) {
		return res.status(405).send("Pin must be 4 digits.");
	}

	user = new User({ username, pin });

	const salt = await genSalt(10);

	const pinToString = user.pin.toString();
	const pinToHash = await hash(pinToString, salt);

	user.pin = pinToHash;

	await user.save();

	const token = generateAuthToken(user);

	return res.status(200).send(token);
});

export default router;
