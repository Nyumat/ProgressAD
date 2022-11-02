import mongoose from "mongoose";
import dotenv from "dotenv";
import { Workout } from "./workout.js";

dotenv.config();

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 200,
		unique: false
	},
	pin: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 99999,
		unique: true
	},
	initLogin: {
		type: Boolean,
		default: true
	},
	weight: {
		type: Number,
		default: 0,
		min: 0,
		max: 600,
		validate: {
			validator: Number.isInteger,
			message: "{VALUE} is not an integer value"
		},
		required: [true, "Weight is required"],
		unique: false
	},
	height: {
		type: Number,
		default: 0,
		min: 0,
		max: 300,
		validate: {
			validator: Number.isInteger,
			message: "{VALUE} is not an integer value"
		},
		required: [true, "Height is required"],
		unique: false
	},
	BMI: {
		type: Number,
		default: 0,
		min: 0,
		max: 100,
		required: [true, "BMI is required"],
		unique: false
	},
	bloodType: {
		type: String,
		enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-", ""],
		required: false,
		unique: false,
		uppercase: true
	},
	loginDateTime: {
		type: Date,
		required: true,
		minlength: 3,
		maxlength: 200,
		unique: false
	},
	logoutDateTime: {
		type: Date,
		required: false,
		minlength: 3,
		maxlength: 200,
		unique: false
	},
	savedWorkouts: [Workout.schema],
	workouts: [Workout.schema],
	workOutType: {
		type: String,
		enum: ["Cardio", "Strength", "Other", "none"],
		required: false,
		unique: false,
		default: "none"
	},
	workOutIntensity: {
		type: String,
		enum: ["Low", "Medium", "High", "none"],
		required: false,
		unique: false,
		default: "none"
	}
});

const User = mongoose.model("User", userSchema);

export { User };
