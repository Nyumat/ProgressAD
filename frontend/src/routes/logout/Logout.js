import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "../../styles/App.css";
import { logout } from "../../slices/userSlice";

function Logout() {
	const seconds = 3;
	const [timeLeft, setTimeLeft] = useState(seconds);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		localStorage.removeItem("token");
		dispatch(logout());
		if (!timeLeft) {
			navigate("/login");
			return;
		}

		if (timeLeft > 0) {
			const interval = setInterval(() => {
				setTimeLeft(timeLeft - 1);
			}, 1000);
			return () => clearInterval(interval);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeLeft]);

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>You have logged out!</h1>
				<h1>Redirecting in {timeLeft} seconds</h1>
			</header>
		</div>
	);
}

export default Logout;
