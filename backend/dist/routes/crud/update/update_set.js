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
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, machine_id, sets } = req.body;
        let user = yield User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist." });
        }
        let workout = user.workouts[user.workouts.length - 1];
        if (!workout) {
            return res.status(400).json({ msg: "You have no current workout." });
        }
        let machine = workout.machines.find((machine) => machine.machine_id === machine_id);
        if (!machine) {
            return res.status(400).json({ msg: "Machine does not exist." });
        }
        sets.forEach((set) => {
            machine.sets.push(set);
        });
        yield user.save();
        res.status(200).json({ msg: "Sets added successfully.", workout });
    }
    catch (error) {
        res.send(error);
    }
}));
export default router;
