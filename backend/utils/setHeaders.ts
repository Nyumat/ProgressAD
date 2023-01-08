import { Router, Request, Response }  from "express";
const router = Router();

router.post("/", async (req: Request, res: Response) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
});

export default router;
