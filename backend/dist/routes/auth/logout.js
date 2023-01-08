var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import User from "../../models/user.js";
import { Router } from "express";
import Dixon from "../../models/dixon.js";
const router = Router();
router.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let username = req.body.username;
    try {
        let user = yield User.findOne({ username: username }).exec();
        if (!user) {
            return res.status(400).send("User doesn't exist.");
        }
        let machine_ids = user.workouts[0].machines.map((machine) => machine.machine_id);
        let machines = yield Dixon.find({ machine_id: { $in: machine_ids } }).exec();
        for (let i = 0; i < machines.length; i++) {
            machines[i].machine_status = true;
            yield machines[i].save();
        }
        user.workouts[0].workoutEndTimestamp = Date.now();
        let workoutDuration = user.workouts[0].workoutEndTimestamp -
            user.workouts[0].workoutStartTimestamp;
        workoutDuration = (workoutDuration / 60000).toFixed(2);
        user.workouts[0].workoutDuration = workoutDuration;
        // possibly change this to handle sudden logout
        user.workouts[0].machines.forEach((machine) => {
            machine.machine_status = true;
        });
        user.savedWorkouts.push(user.workouts[0]);
        user.workouts.pop();
        user.logoutDateTime = Date.now();
        yield user.save();
        res.status(200).json({
            msg: `User ${user.username} logged out successfully!`
        });
    }
    catch (error) {
        res.send(error);
    }
}));
export default router;
