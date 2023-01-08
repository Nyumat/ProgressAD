var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//@ts-nocheck
import User from "../../../models/user.js";
import { Router } from "express";
const router = Router();
router.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, effortLevel, tirednessLevel } = req.body;
    try {
        let user = yield User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        let user_workout = user.workouts[0];
        user_workout.effortLevel = effortLevel;
        user_workout.tirednessLevel = tirednessLevel;
        yield user.save();
        return res.status(200).json({
            msg: `Workout rated for ${username} successfully!`
        });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
}));
export default router;
