import express from "express";
import dotenv from "dotenv";
import os from "os";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cloudinary from "cloudinary";
import path from "path";

// Middleware
import tracker from "./middleware/tracker.js";
import setHeaders from "./utils/setHeaders.js";

// Auth
import register from "./routes/auth/register.js";
import login from "./routes/auth/login.js";
import logout from "./routes/auth/logout.js";

// CRUD
import get_user from "./routes/crud/read/get_user.js";
import get_machines from "./routes/crud/read/get_machines.js";
import get_workouts from "./routes/crud/read/get_workouts.js";
import update_user from "./routes/crud/update/update_user.js";
import update_cardio from "./routes/crud/update/update_cardio.js";
import add_machine from "./routes/crud/update/add_machine.js";
import create_workout from "./routes/crud/create/create_workout.js";
import create_machine from "./routes/crud/create/create_machine.js";
import update_status from "./routes/crud/update/update_status.js";
import end_workout from "./routes/crud/delete/end_workout.js";
import rate_workout from "./routes/crud/update/rate_workout.js";
import add_exercise from "./routes/crud/create/create_exercise.js";
import update_set from "./routes/crud/update/update_set.js";

dotenv.config();

const PORT = process.env.PORT;

// Image Storage
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

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
// Get user endpoint.
app.use("/api/users/get", get_user);
// Create a new workout for a user.
app.use("/api/workouts/create", create_workout);
// Add a new machine to a workout.
app.use("/api/workout/machines/add", add_machine);
// Update cardio machine 'x' with a distance and time spent.
app.use("/api/workout/machines/cardio/add", update_cardio);
// Add a machine to the dixon collectiion
app.use("/api/machine/create", create_machine);
// Get all the machines in the dixon collection
app.use("/api/machines/get", get_machines);
// Update a machine's status in a workout.
app.use("/api/machine/update_status", update_status);
// Update the user's profile
app.use("/api/users/update", update_user);
// Get the user's workout and saved workouts.
app.use("/api/workouts/get", get_workouts);
// End the user's workout.
app.use("/api/workout/end", end_workout);
// Rate the user's workout.
app.use("/api/workout/rate", rate_workout);
// Add an exercise to a workout.
app.use("/api/workout/exercises/add", add_exercise);
// Add a sets to a strength machine.
app.use("/api/workout/machines/sets/add", update_set);

app.get("/api", (req, res) => {
	res.send({ username: os.userInfo().username });
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});

const __dirname = path.resolve();
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const uri = process.env.URI;
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("MongoDB connection established..."))
	.catch((error) => console.error("MongoDB connection failed:", error.message));
