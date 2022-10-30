import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateAuthToken = (user) => {
	const jwtSecretKey = process.env.JWT_SECRET_KEY;
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
