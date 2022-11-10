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
		enum: ["Cardio", "Strength", "Other", "none"],
		default: "none",
		required: false
	},
	is_available: {
		type: Boolean,
		required: false
	},
	distance: {
		type: Number,
		required: false,
		default: 0
	},
	timeSpent: {
		// in minutes
		type: Number,
		required: false,
		default: 0
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
	]
});

const workoutSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unqiue: false
		},
		workOutType: {
			enum: ["Cardio", "Strength", "Other", "none"],
			type: String,
			required: false,
			unique: false,
			default: "none"
		},
		workOutIntensity: {
			enum: ["Low", "Medium", "High", "none"],
			type: String,
			required: true,
			unique: false,
			default: "none"
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
		}
	},
	{
		virtuals: {
			workOutDuration: {
				get() {
					return this.workoutStartTimestamp - this.workoutEndTimestamp;
				}
			}
		}
	}
);

const Workout = mongoose.model("Workout", workoutSchema);
const Machine = mongoose.model("Machine", machineSchema);
export { Workout, Machine };
