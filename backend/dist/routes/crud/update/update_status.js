var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../../../models/user.js";
import { Router } from "express";
import Dixon from '../../../models/dixon.js';
const router = Router();
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { machine_id, username } = req.body;
        let user = yield User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist." });
        }
        let machine = yield Dixon.findOne({ machine_id: machine_id });
        if (!machine) {
            return res.status(400).json({ msg: "Machine does not exist." });
        }
        const user_workout = user.workouts[0];
        let user_machine = User.findOne({ username: username, "workouts.machines.machine_id": machine_id });
        let machine_status = machine.machine_status;
        if (!user_machine) {
            return res.status(400).json({ msg: "Machine does not exist." });
        }
        if (machine_status === false) {
            machine_status = true;
        }
        else {
            machine_status = false;
        }
        yield user.save();
        let machines = yield Dixon.find({});
        res.status(200).json({
            msg: "Machine status updated.",
            machines: machines
        });
        machine.machine_status = machine_status;
        yield machine.save();
    }
    catch (error) {
        res.send(error);
    }
}));
export default router;
