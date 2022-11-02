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
		required: false,
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
	firstName: {
		type: String,
		required: false
	},
	lastName: {
		type: String,
		required: false
	},
	age: {
		type: Number,
		default: 0,
		min: 0,
		max: 150,
		validate: {
			validator: Number.isInteger,
			message: "{VALUE} is not an integer value"
		},
		required: false,
		unique: false
	}
});

const User = mongoose.model("User", userSchema);

export { User };
