import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders } from "./api";

const initState = {
	initLogin: false,
	username: "",
	token: localStorage.getItem("token"),
	status: "",
	error: "",
	userLoaded: false
};

export const initLogin = createAsyncThunk(
	"user/initLogin",
	async (values, { rejectWithValue }) => {
		try {
			const initLogin = await axios.post(`/api/users/init_login`, {
				username: values.username
			});
			return initLogin.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getUser = createAsyncThunk(
	"user/getUser",
	async (values, { rejectWithValue }) => {
		try {
			const token = await axios.post(
				`/api/users/get`,
				{
					username: values.username
				},
				setHeaders()
			);
			localStorage.setItem("token", token.data);
			return token.data;
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
			state.initLogin = false;
			state.token = "";
			state.username = "";
			state.status = "Logged out";
			state.error = "";
			state.userLoaded = false;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(initLogin.pending, (state) => {
			state.status = "Init Login Pending";
		});
		builder.addCase(initLogin.fulfilled, (state, action) => {
			state.status = "Init Login Fulfilled";
			state.initLogin = action.payload.initLogin;
			state.error = "";
			state.userLoaded = true;
			state.status = "Loaded User";
			state.username = action.payload.username;
			state.token = action.payload.token;
		});
		builder.addCase(initLogin.rejected, (state, action) => {
			state.status = "Init Login Rejected";
			state.error = action.payload;
			state.userLoaded = false;
		});
	}
});

export const { loadUser, logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
