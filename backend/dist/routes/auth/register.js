var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { genSalt, hash } from "bcrypt";
import joi from "joi";
import { Router } from "express";
import generateAuthToken from "../../utils/generateToken.js";
import User from '../../models/user.js';
const router = Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi.object({
        username: joi.string().min(3).max(200).required(),
        pin: joi.number().min(0).max(9999).required(),
        weight: joi.number().min(0).max(600).required(),
        height: joi.number().min(0).max(100).required(),
        bloodType: joi.string().min(0).max(3).optional(),
        BMI: joi.number()
    });
    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let user = yield User.findOne({ username: req.body.username });
    if (user)
        return res.status(406).send("User already exists.");
    const { username, pin, weight, height, bloodType, BMI } = req.body;
    if (pin.toString().length > 4 || pin.toString().length < 4) {
        return res.status(405).send("Pin must be 4 digits.");
    }
    user = new User({
        username,
        pin,
        weight,
        height,
        bloodType,
        BMI,
        workouts: []
    });
    const salt = yield genSalt(10);
    const pinToString = user.pin.toString();
    const pinToHash = yield hash(pinToString, salt);
    user.pin = pinToHash;
    yield user.save();
    return res.status(200).json({
        msg: `User ${username} created successfully!`,
        token: generateAuthToken({
            _id: user._id,
            username: user.username,
            key: process.env.JWT_SECRET_KEY
        })
    });
}));
export default router;
