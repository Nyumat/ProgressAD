import express from "express";
import dotenv from "dotenv";
import os from "os";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import tracker from "./middleware/tracker.js";
import setHeaders from "./utils/setHeaders.js";
import register from "./routes/auth/register.js";
import login from "./routes/auth/login.js";
import init from "./routes/auth/init.js";
import get_user from "./routes/crud/read/get_user.js";
import logout from "./routes/auth/logout.js";
import create_workout from "./routes/crud/create/create_workout.js";
import add_machine from "./routes/crud/update/add_machine.js";
import add_set from "./routes/crud/update/add_set.js";
import update_cardio from "./routes/crud/update/update_cardio.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

// Only parse urlencoded bodies.
app.use(bodyParser.urlencoded({ extended: true }));
// Parse incoming requests data as JSON.
app.use(bodyParser.json());
// Allow cross-origin requests.
app.use(cors());
// Track the requests to the backend.
app.use(tracker);
// Set the headers for the requests.
app.use(setHeaders);
// Register a user endpoint.
app.use("/api/users/register", register);
// Login a user endpoint.
app.use("/api/users/login", login);
// Logout a user endpoint.
app.use("/api/users/logout", logout);
// Init login endpoint.
app.use("/api/users/init_login", init);
// Get user endpoint.
app.use("/api/users/get", get_user);
// Create a new workout for a user.
app.use("/api/workouts/create", create_workout);
// Add a new machine to a workout.
app.use("/api/workout/machines/add", add_machine);
// Add a new set {reps,weight} to a strength machine.
app.use("/api/workout/machines/sets/add", add_set);
// Update cardio machine 'x' with a distance and time spent.
app.use("/api/workout/machines/cardio/add", update_cardio);

app.get("/api", (req, res) => {
	res.send({ username: os.userInfo().username });
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});

const uri = process.env.URI;
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("MongoDB connection established..."))
	.catch((error) => console.error("MongoDB connection failed:", error.message));
