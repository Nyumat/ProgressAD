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
import Dixon from "../../../models/dixon.js";
import User from "../../../models/user.js";
import { Router } from "express";
const router = Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, machine_id } = req.body;
        console.log(req.body);
        let machine_type;
        let machine_name;
        let is_available;
        let dixon = yield Dixon.findOne({
            machine_id: machine_id
        });
        if (!dixon) {
            return res.status(400).json({ msg: "Machine does not exist at Dixon" });
        }
        machine_type = dixon.machine_type;
        machine_name = dixon.machine_name;
        is_available = dixon.machine_status;
        if (is_available === false) {
            return res.status(400).json({ msg: "Machine is currently in use" });
        }
        const user = yield User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist." });
        }
        if (user.workouts.length === 0) {
            return res
                .status(400)
                .json({ msg: "You must start a workout to use a machine." });
        }
        let user_workout = user.workouts[user.workouts.length - 1];
        let user_machines = user_workout.machines;
        if (machine_type === "Cardio") {
            user.workouts[user.workouts.length - 1].machines.push({
                username: username,
                machine_name: machine_name,
                machine_type: machine_type,
                machine_id: machine_id,
                machine_status: false,
                sets: null
            });
            yield user.save();
            dixon.machine_status = false;
            yield dixon.save();
            return res.status(200).json({
                msg: `${machine_name} added successfully.`,
                machine: user.workouts[user.workouts.length - 1].machines[user.workouts[user.workouts.length - 1].machines.length - 1]
            });
        }
        else if (machine_type === "Strength") {
            user.workouts[user.workouts.length - 1].machines.push({
                username: username,
                machine_name: machine_name,
                machine_type: machine_type,
                machine_id: machine_id,
                machine_status: false,
                sets: []
            });
            yield user.save();
            dixon.machine_status = false;
            yield dixon.save();
            return res.status(200).json({
                msg: `${machine_name} added successfully.`,
                machine: user.workouts[user.workouts.length - 1].machines[user.workouts[user.workouts.length - 1].machines.length - 1]
            });
        }
        else if (machine_type === "Other") {
            user.workouts[user.workouts.length - 1].machines.push({
                username: username,
                machine_name: machine_name,
                machine_type: machine_type,
                machine_id: machine_id,
                machine_status: false,
                sets: null
            });
            yield user.save();
            dixon.machine_status = false;
            yield dixon.save();
            return res.status(200).json({
                msg: `${machine_name} added successfully.`,
                machine: user.workouts[user.workouts.length - 1].machines[user.workouts[user.workouts.length - 1].machines.length - 1]
            });
        }
        else {
            return res.status(400).json({ msg: "Machine type not found." });
        }
    }
    catch (error) {
        res.send(error);
    }
}));
export default router;
