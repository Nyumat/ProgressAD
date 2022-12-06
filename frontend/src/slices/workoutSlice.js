import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initState = {
  cancelledWorkouts: [],
  completedWorkouts: [],
  currentWorkout: {},
  status: "",
  error: "",
  workoutLoaded: false,
  machines: [],
};

export const getGlobalMachines = createAsyncThunk(
  "workout/getGlobalMachines",
  async (values, { rejectWithValue }) => {
    try {
      const machines = await axios.get(
        `${process.env.REACT_APP_TRCKME_BACKEND}/api/machines/get`
      );
      return machines.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addMachineToWorkout = createAsyncThunk(
  "workout/addMachineToWorkout",
  async (values, { rejectWithValue }) => {
    try {
      const machine = await axios.post(
        `${process.env.REACT_APP_TRCKME_BACKEND}/api/workout/machines/add`,
        {
          machine_id: values.machine_id,
          username: values.username,
        }
      );
      return machine.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createWorkout = createAsyncThunk(
  "workout/createWorkout",
  async (workout, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_TRCKME_BACKEND}/api/workouts/create`,
        {
          username: workout.username,
          workOutType: workout.workOutType,
          workOutIntensity: workout.workOutIntensity,
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getWorkout = createAsyncThunk(
  "workout/getWorkout",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_TRCKME_BACKEND}/api/workouts/get`,
        {
          params: {
            username: username,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const endWorkout = createAsyncThunk(
  "workout/endWorkout",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_TRCKME_BACKEND}/api/workout/end`,
        {
          username: username,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const rateWorkout = createAsyncThunk(
  "workout/rateWorkout",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_TRCKME_BACKEND}/api/workout/rate`,
        {
          username: values.username,
          effortLevel: values.effortLevel,
          tirednessLevel: values.tirednessLevel,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addExerciseToWorkout = createAsyncThunk(
  "workout/addExerciseToWorkout",
  async (values, { rejectWithValue }) => {
    try {
      const workout = await axios.patch(
        `${process.env.REACT_APP_TRCKME_BACKEND}/api/workout/exercises/add`,
        {
          username: values.username,
          exercise_name: values.exercise_name,
        }
      );
      return workout.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addSetsToMachine = createAsyncThunk(
  "workout/addSetsToExercise",
  async (values, { rejectWithValue }) => {
    try {
      const workout = await axios.post(
        `${process.env.REACT_APP_TRCKME_BACKEND}/api/workout/machines/sets/add`,
        {
          username: values.username,
          machine_id: values.machine_id,
          sets: values.sets,
        }
      );
      return workout.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCardioDataToMachine = createAsyncThunk(
  "workout/addCardioDataToMachine",
  async (values, { rejectWithValue }) => {
    try {
      const workout = await axios.put(
        `${process.env.REACT_APP_TRCKME_BACKEND}/api/workout/machines/cardio/add`,
        {
          username: values.username,
          machine_id: values.machine_id,
          distance: values.distance,
          timeSpent: values.timeSpent,
        }
      );
      return workout.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
    },
    unloadWorkout: (state, action) => {
      state.completedWorkouts = [];
      state.cancelledWorkouts = [];
      state.error = "";
      state.currentWorkout = {};
      state.workoutLoaded = false;
      state.status = "Workout unloaded";
    },
    addMachineToWorkout: (state, action) => {
      state.currentWorkout.machines.push(action.payload);
      state.status = "Machine added to workout";
    },
    toggleMachineUse: (state, action) => {
      const machine = state.currentWorkout.machines.find(
        (machine) => machine.machine_id === action.payload.machine_id
      );
      machine.machine_status = !machine.machine_status;
      state.status = "Machine use toggled";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createWorkout.pending, (state) => {
      state.status = "Creating workout...";
    });
    builder.addCase(createWorkout.fulfilled, (state, action) => {
      state.currentWorkout = action.payload.workout;
      state.workoutLoaded = true;
      state.status = "Workout created";
      state.error = "";
    });
    builder.addCase(createWorkout.rejected, (state, action) => {
      state.status = "Workout creation failed";
      state.error = action.payload.msg;
    });
    builder.addCase(getWorkout.pending, (state) => {
      state.status = "Getting workout...";
    });
    builder.addCase(getWorkout.fulfilled, (state, action) => {
      state.status = action.payload.msg;
      state.completedWorkouts = action.payload.savedWorkouts;
      state.currentWorkout = action.payload.currentWorkout || {};
      state.workoutLoaded = true;
      state.error = "";
    });
    builder.addCase(getWorkout.rejected, (state, action) => {
      state.status = "Workout retrieval failed";
      state.error = action.payload.msg;
      state.workoutLoaded = false;
    });
    builder.addCase(endWorkout.pending, (state) => {
      state.status = "Ending workout...";
    });
    builder.addCase(endWorkout.fulfilled, (state, action) => {
      state.status = action.payload.msg;
      state.completedWorkouts = action.payload.savedWorkouts;
      state.workoutLoaded = false;
      state.currentWorkout = {};
      state.error = "";
    });
    builder.addCase(endWorkout.rejected, (state, action) => {
      state.status = "Workout ending failed";
      state.error = action.payload.msg;
    });
    builder.addCase(getGlobalMachines.pending, (state) => {
      state.status = "Getting machines...";
    });
    builder.addCase(getGlobalMachines.fulfilled, (state, action) => {
      state.status = "Machines retrieved";
      state.machines = action.payload.machines;
      state.error = "";
    });
    builder.addCase(getGlobalMachines.rejected, (state, action) => {
      state.status = "Machine retrieval failed";
      state.error = action.payload.msg;
    });
    builder.addCase(addMachineToWorkout.pending, (state) => {
      state.status = "Adding machine to workout...";
    });
    builder.addCase(addMachineToWorkout.fulfilled, (state, action) => {
      state.status = action.payload.msg;
      state.currentWorkout.machines.push(action.payload.machine);
    });
    builder.addCase(addMachineToWorkout.rejected, (state, action) => {
      state.status = "Machine addition failed";
      state.error = action.payload.msg;
    });
    builder.addCase(rateWorkout.pending, (state) => {
      state.status = "Rating workout...";
    });
    builder.addCase(rateWorkout.fulfilled, (state, action) => {
      state.status = action.payload.msg;
      state.error = "";
    });
    builder.addCase(rateWorkout.rejected, (state, action) => {
      state.status = "Workout rating failed";
      state.error = action.payload.msg;
    });
    builder.addCase(addExerciseToWorkout.pending, (state) => {
      state.status = "Adding exercise to workout...";
    });
    builder.addCase(addExerciseToWorkout.fulfilled, (state, action) => {
      state.status = action.payload.msg;
      state.error = "";
      state.currentWorkout = action.payload.workout;
    });
    builder.addCase(addExerciseToWorkout.rejected, (state, action) => {
      state.status = "Exercise addition failed";
      state.error = action.payload.msg;
    });
    builder.addCase(addSetsToMachine.pending, (state) => {
      state.status = "Adding sets to machine...";
    });
    builder.addCase(addSetsToMachine.fulfilled, (state, action) => {
      state.status = action.payload.msg;
      state.error = "";
      state.currentWorkout = action.payload.workout;
    });
    builder.addCase(addSetsToMachine.rejected, (state, action) => {
      state.status = "Set addition failed";
      state.error = action.payload.msg;
    });
    builder.addCase(addCardioDataToMachine.pending, (state) => {
      state.status = "Adding cardio data to machine...";
    });
    builder.addCase(addCardioDataToMachine.fulfilled, (state, action) => {
      state.status = action.payload.msg;
      state.error = "";
      state.currentWorkout = action.payload.workout;
    });
    builder.addCase(addCardioDataToMachine.rejected, (state, action) => {
      state.status = "Cardio data addition failed";
      state.error = action.payload.msg;
    });
  },
});

export const {
  startWorkout,
  cancelWorkout,
  completeWorkout,
  unloadWorkout,
  toggleMachineUse,
} = workoutSlice.actions;

export const selectWorkout = (state) => state.workout;
export const selectCurrentWorkout = (state) => state.workout.currentWorkout;
export const selectMachinesWkt = (state) => state.workout.machines.machines;

export default workoutSlice.reducer;
