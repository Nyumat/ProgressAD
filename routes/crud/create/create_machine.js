import { Router } from "express";
import { Dixon } from "../../../models/dixon.js";
const router = Router();
import cloudinary from "cloudinary";
import path from "path";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

router.post("/", async (req, res) => {
	let __dirname = path.resolve();
	/*
	 * Replace 'XXXX' with the filename & extension of the image you want to upload.
	 * The file must be in the /images directory.
	 */
	let image = path.join(__dirname, "images", "XXXX.jpg");

	try {
		const { machine_name, machine_type } = req.body;

		const machine_id = uuidv4();

		let result = await cloudinary.v2.uploader.upload(image, {
			public_id: machine_id,
			folder: "machines"
		});

		let image_url = result.secure_url;
		// For testing purposes, uncomment the line below to see the image URL.
		//console.log(image_url);

		let dixon = await Dixon.findOne({ machine_id: machine_id }).exec();

		dixon = new Dixon({
			machine_name: machine_name,
			machine_id: machine_id,
			machine_type: machine_type,
			machine_status: true,
			machine_image: image_url
		});

		await dixon.save();

		res.status(200).json({ msg: "Machine created successfully!" });
	} catch (error) {
		res.send(error);
	}
});

export default router;
