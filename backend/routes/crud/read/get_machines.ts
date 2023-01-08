import { Router, Request, Response }  from "express";
import Dixon from "../../../models/dixon.js";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
	try {
		let dixon = await Dixon.find({}).exec();
		let machines: any[] = [];
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
	} catch (error) {
		return res.status(400).send(error);
	}
});

export default router;
