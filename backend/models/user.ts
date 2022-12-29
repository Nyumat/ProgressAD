import mongoose from "mongoose";
import dotenv from "dotenv";
import { Workout } from "./workout.js";
dotenv.config();
import { Schema, model, connect } from 'mongoose';

enum EBloodType {
	A = "A",
	B = "B",
	AB = "AB",
	O = "O",
	None = ""
}

type UserType = mongoose.Document & {
	username: string;
	pin: string;
	initLogin?: boolean;
	weight: number;
	height: number;
	BMI: number;
	bloodType?: string;
	createdAt: Date;
	updatedAt: Date;
	savedWorkouts: typeof Workout[];
	workouts: typeof Workout[];
	firstName?: string;
	lastName?: string;
	age?: number;
	timestamps?: boolean;
}

const userSchema = new mongoose.Schema<UserType>({
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
		unique: false
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
	// loginDateTime: {
	// 	type: Date,
	// 	required: false,
	// 	minlength: 3,
	// 	maxlength: 200,
	// 	unique: false
	// },
	// logoutDateTime: {
	// 	type: Date,
	// 	required: false,
	// 	minlength: 3,
	// 	maxlength: 200,
	// 	unique: false
	// },
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
	},
	timestamps: {
		type: Boolean,
		default: true
	}
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;