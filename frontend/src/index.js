import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Login from "./routes/login/Login";
import Logout from "./routes/logout/Logout";
import Register from "./routes/register/Register";

import "./index.css";

import store from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

function ProgressAD() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<>
							<App />
						</>
					}
				/>
				<Route
					path='/login'
					element={
						<>
							<Login />
						</>
					}
				/>
				<Route
					path='/register'
					element={
						<>
							<Register />
						</>
					}
				/>
				<Route
					path='/logout'
					element={
						<>
							<Logout />
						</>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}></PersistGate>
			<ProgressAD />
		</Provider>
	</React.StrictMode>
);
