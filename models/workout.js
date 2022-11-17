import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const machineSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unqiue: false
	},
	machine_name: {
		type: String,
		required: false
	},
	machine_type: {
		type: String,
		enum: ["Cardio", "Strength", "Other", "None"],
		default: "None",
		required: false
	},
	machine_status: {
		// 1,true = available, 0,false = in use
		type: Boolean,
		required: false
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
		required: false,
		unique: false
	}
});

const workoutSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unqiue: false
	},
	workOutType: {
		enum: ["Cardio", "Strength", "Other", "None"],
		type: String,
		required: false,
		unique: false,
		default: "None"
	},
	workOutIntensity: {
		enum: ["Low", "Medium", "High", "None"],
		type: String,
		required: false,
		unique: false,
		default: "None"
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
	}
});

const Workout = mongoose.model("Workout", workoutSchema);
const Machine = mongoose.model("Machine", machineSchema);
export { Workout, Machine };
