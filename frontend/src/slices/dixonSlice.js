import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initState = {
	machines: [],
	status: "",
	error: "",
	machinesLoaded: false,
	isOpen: true,
	userCount: 0
};

export const getMachinesAtDixon = createAsyncThunk(
	"dixon/getMachinesAtDixon",
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

export const toggleDixonMachineStatus = createAsyncThunk(
	"dixon/toggleDixonMachineStatus",
	async (values, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_TRCKME_BACKEND}/api/machine/update_status`,
				{
					machine_id: values.machine_id,
					username: values.username
				}
			);
			return response.data;
		} catch (error) {
			console.log(error.response);
			return rejectWithValue(error.response.data);
		}
	}
);

export const dixonSlice = createSlice({
	name: "dixon",
	initialState: initState,
	reducers: {
		toggleIsOpen: (state) => {
			state.isOpen = !state.isOpen;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getMachinesAtDixon.pending, (state) => {
			state.status = "Loading...";
		});
		builder.addCase(getMachinesAtDixon.fulfilled, (state, action) => {
			state.status = action.payload.msg;
			state.machines = action.payload.machines;
			state.machinesLoaded = true;
		});
		builder.addCase(getMachinesAtDixon.rejected, (state, action) => {
			state.status = "Failed";
			state.error = action.payload.msg;
		});
		builder.addCase(toggleDixonMachineStatus.pending, (state) => {
			state.status = "Ending use of machine...";
		});
		builder.addCase(toggleDixonMachineStatus.fulfilled, (state, action) => {
			state.status = action.payload.msg;
			state.machines = action.payload.machines;
		});
		builder.addCase(toggleDixonMachineStatus.rejected, (state, action) => {
			state.status = "Failed to end use of machine.";
			state.error = action.payload.msg;
		});
	}
});

export const { toggleIsOpen, getSpecificMachine } = dixonSlice.actions;

export const selectMachines = (state) => state.dixon.machines;

export const selectSpecificMachine = (state) => state.dixon.quriedMachine;

export const selectMachineById = (state, machineId) => {
	return state.dixon.machines.find((machine) => machine._id === machineId);
};

export const selectIsOpen = (state) => state.dixon.isOpen;

export default dixonSlice.reducer;
