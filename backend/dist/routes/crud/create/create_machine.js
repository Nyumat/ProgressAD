var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
const router = Router();
import cloudinary from "cloudinary";
import path from "path";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import Dixon from '../../../models/dixon.js';
dotenv.config();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let __dirname = path.resolve();
    /*
     * Replace 'XXXX' with the filename & extension of the image you want to upload.
     * The file must be in the /images directory.
     */
    let image = path.join(__dirname, "images", "squat.jpg");
    try {
        const { machine_name, machine_type } = req.body;
        const machine_id = uuidv4();
        let result = yield cloudinary.v2.uploader.upload(image, {
            public_id: machine_id,
            folder: "machines"
        });
        let image_url = result.secure_url;
        // For testing purposes, uncomment the line below to see the image URL.
        //console.log(image_url);
        let dixon = yield Dixon.findOne({ machine_id: machine_id }).exec();
        dixon = new Dixon({
            machine_name: machine_name,
            machine_id: machine_id,
            machine_type: machine_type,
            machine_status: true,
            machine_image: image_url
        });
        yield dixon.save();
        res.status(200).json({
            msg: "Machine created successfully!",
            id: machine_id,
        });
    }
    catch (error) {
        res.send(error);
    }
}));
export default router;
