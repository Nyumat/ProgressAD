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
import Dixon from "../../../models/dixon.js";
const router = Router();
router.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let username = req.body.username;
    try {
        let user = yield User.findOne({ username: username }).exec();
        if (!user) {
            return res.status(400).send("User doesn't exist.");
        }
        if (user.workouts.length === 0) {
            return res
                .status(400)
                .json({ msg: `${user.username} has no current workout to end.` });
        }
        let machine_ids = User.find({ username }, {
            "workouts.$[workout].machines.machine_id": 1
        });
        User.updateMany({
            username
        }, {
            $set: {
                "workouts.$[workout].machines.$[machine].machine_status": true
            }
        });
        let ids = Dixon.find({ machine_id: { $in: machine_ids } }, (err, machines) => {
            if (err) {
                return res.status;
            }
            return machines.map((machine) => machine._id);
        });
        let machines = yield Dixon.find({ machine_id: { $in: ids } }).exec();
        for (let i = 0; i < machines.length; i++) {
            machines[i].machine_status = true;
            machines[i].save();
        }
        User.updateOne({
            username
        }, {
            $set: {
                "workouts[0].workoutEndTimestamp": Date.now()
            }
        }).exec();
        user.savedWorkouts.push(user.workouts[0]);
        user.workouts.pop();
        yield user.save();
        res.status(200).json({
            msg: `User ${user.username} workout ended successfully!`,
            savedWorkouts: user.savedWorkouts
        });
    }
    catch (error) {
        res.send(error);
    }
}));
export default router;
