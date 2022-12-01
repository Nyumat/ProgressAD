import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slices/userSlice";
import workoutSlice from "./slices/workoutSlice";
import dixonSlice from "./slices/dixonSlice";

const reducers = combineReducers({
  user: userSlice,
  workout: workoutSlice,
  dixon: dixonSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "workout", "dixon"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
