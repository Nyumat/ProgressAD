import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initState = {
	username: "",
	status: "",
	error: "",
	userLoaded: false
};

export const getUser = createAsyncThunk(
	"user/getUser",
	async (values, { rejectWithValue }) => {
		try {
			let username = values;
			const user = await axios.get("/api/users/get", {
				params: {
					username: username
				}
			});
			return user.data;
		} catch (error) {
			console.log(error.response);
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateProfile = createAsyncThunk(
	"user/updateProfile",
	async (values, { rejectWithValue }) => {
		try {
			const user = await axios.put("/api/users/update", values);
			return user.data;
		} catch (error) {
			console.log(error.response);
			return rejectWithValue(error.response.data);
		}
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState: initState,
	reducers: {
		logout: (state) => {
			state.username = "";
			state.status = "";
			state.error = "";
			state.userLoaded = false;
			state.weight = "";
			state.height = "";
			state.age = "";
			state.BMI = "";
			state.bloodType = "";
			state.token = "";
			state.firstName = "";
			state.lastName = "";
		},
		loadToken: (state, action) => {
			state.token = action.payload;
			localStorage.setItem("token", action.payload);
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getUser.pending, (state) => {
			state.status = "Loading User";
		});
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.token = localStorage.getItem("token");
			state.status = action.payload.msg;
			state.username = action.payload.user.username;
			state.userLoaded = true;
			state.weight = action.payload.user.weight;
			state.height = action.payload.user.height;
			state.bloodType = action.payload.user.bloodType;
			state.BMI = action.payload.user.BMI;
			state.firstName = action.payload.user.firstName;
			state.lastName = action.payload.user.lastName;
			state.age = action.payload.user.age;
		});
		builder.addCase(getUser.rejected, (state, action) => {
			state.status = "Failed to load user";
			state.error = action.payload;
		});
		builder.addCase(updateProfile.pending, (state) => {
			state.status = "Updating Profile";
		});

		builder.addCase(updateProfile.fulfilled, (state, action) => {
			state.status = action.payload.msg;
			state.username = action.payload.user.username;
			state.weight = action.payload.user.weight;
			state.height = action.payload.user.height;
			state.bloodType = action.payload.user.bloodType;
			state.BMI = action.payload.user.BMI;
			state.userLoaded = true;
			state.firstName = action.payload.user.firstName;
			state.lastName = action.payload.user.lastName;
			state.age = action.payload.user.age;
		});

		builder.addCase(updateProfile.rejected, (state, action) => {
			state.status = "Failed to update profile";
			state.error = action.payload.msg;
		});
	}
});

export const { logout, loadToken } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
