import "./styles/App.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function App() {
	const navigate = useNavigate();

	const initLoginState = useSelector((state) => state.user.initLogin);
	const username = useSelector((state) => state.user.username);

	useEffect(() => {}, []);

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>
					Hello, {username}! <br></br>Is this your first time on the site:
					<br></br>
					{initLoginState ? "Yes" : "No"}
				</h1>
				<br></br>
				<button
					style={{
						fontSize: "1.5rem",
						padding: "0.5rem",
						borderRadius: "0.3rem",
						backgroundColor: "grey",
						color: "white"
					}}
					onClick={() => {
						navigate("/logout");
					}}>
					Logout
				</button>
			</header>
		</div>
	);
}

export default App;
