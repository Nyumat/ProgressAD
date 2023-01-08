import { Router, Request, Response }  from "express";

const router = Router();
const connectionTracker = {};

router.all("*", function (req: Request, res: Response, next) {
	const counter = connectionTracker[req.originalUrl];

	if (counter || counter === 0) {
		connectionTracker[req.originalUrl] = counter + 1;
	} else {
		connectionTracker[req.originalUrl] = 1;
	}

	console.log("========REQUEST RECEIVED========");
	console.log(`REQUEST ROUTE:  ${JSON.stringify(req.originalUrl, null, "  ")}`);
	console.log(`REQUEST METHOD:  ${JSON.stringify(req.method, null, "  ")}`);
	console.log(`REQUEST BODY:  ${JSON.stringify(req.body, null, "  ")}`);
	console.log(`REQUEST QUERY:  ${JSON.stringify(req.query, null, "  ")}`);
	console.log(`STATUS CODE:  ${JSON.stringify(res.statusCode, null, "  ")}`);
	console.log(`REQUEST HEADERS:  ${JSON.stringify(req.headers, null, "  ")}`);
	console.log(
		`SESSION VISITS: ${JSON.stringify(connectionTracker, null, "  ")}`
	);
	next();
});

export default router;
