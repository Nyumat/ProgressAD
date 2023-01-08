var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router, Request, Response } from "express";
import Dixon from "../../../models/dixon.js";
const router = Router();
router.get("/", (req: Request, res: Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let dixon = yield Dixon.find({}).exec();
        let machines = [];
        dixon.map((machine) => {
            machines.push({
                machine_name: machine.machine_name,
                machine_id: machine.machine_id,
                machine_type: machine.machine_type,
                machine_status: machine.machine_status,
                machine_image: machine.machine_image
            });
        });
        return res.status(200).json({
            msg: `Machines found successfully!`,
            machines: machines
        });
    }
    catch (error) {
        return res.status(400).send(error);
    }
}));
export default router;
