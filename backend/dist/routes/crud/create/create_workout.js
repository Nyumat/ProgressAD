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
import User from "../../../models/user.js";
import { Workout } from "../../../models/workout.js";
const router = Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, workOutType, workOutIntensity } = req.body;
    try {
        let user = yield User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        let workout = new Workout({
            username,
            workOutType,
            workOutIntensity,
            workoutStartTimestamp: Date.now(),
            machines: []
        });
        if (user.workouts.length > 0) {
            return res.status(400).json({ msg: "Workout already going on." });
        }
        else {
            User.updateOne({
                username
            }, {
                $push: {
                    workouts: workout
                }
            }).exec();
            yield user.save();
            return res.status(200).json({
                msg: `Workout created for ${username} successfully!`,
                workout: user.workouts[0]
            });
        }
    }
    catch (error) {
        res.send(error);
    }
}));
export default router;
