import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
var EWorkoutType;
(function (EWorkoutType) {
    EWorkoutType["Cardio"] = "Cardio";
    EWorkoutType["Strength"] = "Strength";
    EWorkoutType["Other"] = "Other";
    EWorkoutType["None"] = "None";
})(EWorkoutType || (EWorkoutType = {}));
var EWorkoutIntensity;
(function (EWorkoutIntensity) {
    EWorkoutIntensity["Low"] = "Low";
    EWorkoutIntensity["Medium"] = "Medium";
    EWorkoutIntensity["High"] = "High";
    EWorkoutIntensity["None"] = "None";
})(EWorkoutIntensity || (EWorkoutIntensity = {}));
const exerciseSchema = new mongoose.Schema({
    exercise_name: {
        type: String,
        required: true,
    }
});
const machineSchema = new mongoose.Schema({
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
const workoutSchema = new mongoose.Schema({
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
const Workout = mongoose.model("Workout", workoutSchema);
const Machine = mongoose.model("Machine", machineSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);
export { Workout, Machine, Exercise, EWorkoutType, EWorkoutIntensity };
