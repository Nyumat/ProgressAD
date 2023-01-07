import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

export interface UserTokenGenerator {
	_id: string;
	username: string;
	key: Secret;
}

const generateAuthToken = (user: UserTokenGenerator) => {
	if (!process.env.JWT_SECRET_KEY) {
		throw new Error("JWT_SECRET_KEY is not defined.");
	}
	const jwtSecretKey = process.env.JWT_SECRET_KEY as Secret;
	const token = jwt.sign(
		{
			_id: user._id,
			username: user.username
		},
		jwtSecretKey
	);

	return token;
};

export default generateAuthToken;
