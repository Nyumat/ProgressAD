import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initState = {
	username: "",
	cancelledWorkouts: [],
	completedWorkouts: [],
	currentWorkout: {},
	status: "",
	error: "",
	userLoaded: false,
	workoutLoaded: false
};

export const createWorkout = createAsyncThunk(
	"workout/createWorkout",
	async (workout, { rejectWithValue }) => {
		try {
			const res = await axios.post("/api/workouts/create", workout);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const workoutSlice = createSlice({
	name: "workout",
	initialState: initState,
	reducers: {
		startWorkout: (state, action) => {
			state.currentWorkout = action.payload;
			state.workoutLoaded = true;
			state.status = "Workout started";
		},
		cancelWorkout: (state, action) => {
			state.currentWorkout = {};
			state.workoutLoaded = false;
			state.status = "Workout cancelled";
		},
		completeWorkout: (state, action) => {
			state.currentWorkout = {};
			state.completedWorkouts.push(action.payload);
			state.workoutLoaded = false;
			state.status = "Workout completed";
		}
	},
	extraReducers: (builder) => {
		builder.addCase(createWorkout.pending, (state) => {
                  state.status = "Creating workout...";
		});
	}
});

export const { startWorkout, cancelWorkout, completeWorkout } =
	workoutSlice.actions;

export const selectWorkout = (state) => state.workout;

export default workoutSlice.reducer;
