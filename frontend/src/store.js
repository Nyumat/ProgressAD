import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slices/userSlice";
import workoutSlice from "./slices/workoutSlice";

const reducers = combineReducers({
	user: userSlice,
	workout: workoutSlice
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["user", "workout"]
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false })
});

export default store;
