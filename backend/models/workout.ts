import mongoose from "mongoose";
import { Schema, model, connect } from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

enum EWorkoutType {
	Cardio = "Cardio",
	Strength = "Strength",
	Other = "Other",
	None = "None"
}

enum EWorkoutIntensity {
	Low = "Low",
	Medium = "Medium",
	High = "High",
	None = "None"
}

type ExerciseType = mongoose.Document & {
	exercise_name: string;
}

type ExerciseSetType = mongoose.Document & {
	reps?: number;
	weight?: number;
}

type MachineType = mongoose.Document & {
	username: string;
	machine_name: string;
	machine_type: string;
	machine_status: boolean;
	distance: number;
	timeSpent: number;
	sets: ExerciseSetType[];
	machine_id: string;
}

type WorkoutType = mongoose.Document & {
	_id: string;
	username: string;
	workOutType: EWorkoutType;
	workOutIntensity: string;
	machines: MachineType[];
	workoutStartTimestamp: Date;
	workoutEndTimestamp: Date;
	effortLevel: number;
	workoutDuration: number;
	tirednessLevel: number;
	workoutExercises: ExerciseType[];
}	


const exerciseSchema = new mongoose.Schema<ExerciseType>({
	exercise_name: {
		type: String,
		required: true,
	}
});

const machineSchema = new mongoose.Schema<MachineType>({
	username: {
		type: String,
		required: true,
		unqiue: true
	},
	machine_name: {
		type: String,
		required: true
	},
	machine_type: {
		type: String,
		enum: ["Cardio", "Strength", "Other", "None"],
		default: "None",
		required: true
	},
	machine_status: {
		// 1,true = available, 0,false = in use
		type: Boolean,
		required: true
	},
	distance: {
		// in miles
		type: Number,
		required: false
	},
	timeSpent: {
		// in minutes
		type: Number,
		required: false
	},
	sets: [
		{
			reps: {
				type: Number,
				required: false,
				default: 0
			},
			weight: {
				type: Number,
				required: false,
				default: 0
			}
		}
	],
	machine_id: {
		type: String,
		required: true,
		unique: true
	}
});

const workoutSchema = new mongoose.Schema<WorkoutType>({
	username: {
		type: String,
		required: true,
		unqiue: false
	},
	workOutType: {
		enum: [EWorkoutType.Cardio, EWorkoutType.Strength, EWorkoutType.Other, EWorkoutType.None],
		type: String,
		required: false,
		unique: false,
		default: EWorkoutType.None
	},
	workOutIntensity: {
		enum: [EWorkoutIntensity.Low, EWorkoutIntensity.Medium, EWorkoutIntensity.High, EWorkoutIntensity.None],
		type: String,
		required: false,
		unique: false,
		default: EWorkoutIntensity.None
	},
	machines: [machineSchema],
	workoutStartTimestamp: {
		type: Date,
		required: false,
		unique: false
	},
	workoutEndTimestamp: {
		type: Date,
		required: false,
		unique: false
	},
	effortLevel: {
		type: Number,
		required: false,
		min: 0,
		max: 10,
		unique: false
	},
	tirednessLevel: {
		type: Number,
		required: false,
		min: 0,
		max: 10,
		unique: false
	},
	workoutDuration: {
		// in minutes
		type: Number,
		required: false,
		unique: false
	},
	workoutExercises: [exerciseSchema]
});

const Workout = mongoose.model<WorkoutType>("Workout", workoutSchema);
const Machine = mongoose.model<MachineType>("Machine", machineSchema);
const Exercise = mongoose.model<ExerciseType>("Exercise", exerciseSchema);

export { Workout, Machine, Exercise, EWorkoutType, EWorkoutIntensity };
