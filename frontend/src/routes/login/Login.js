import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormData from "form-data";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { getUser, loadToken } from "../../slices/userSlice";
import FitnessCenter from "@mui/icons-material/FitnessCenter";
import { LoadingButton } from "@mui/lab";
import { getGlobalMachines } from "../../slices/workoutSlice";

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			sx={{
				position: "absolute",
				bottom: 15,
				ml: 17
			}}>
			{"Copyright © "}
			<Link
				color='inherit'
				href='https://github.com/TrackMeAtDixon/Progress#readme'>
				ProgressAD
			</Link>{" "}
			{new Date().getFullYear()}.
		</Typography>
	);
}

const theme = createTheme();

export default function Login() {
	const [loading, setLoading] = useState(false);
	const [color, setColor] = useState("primary");

	const [errorUsername, setErrorUsername] = useState(false);
	const [errorPin, setErrorPin] = useState(false);
	const [errorMsgPin, setErrorMsgPin] = useState("");
	const [errorMsgUsername, setErrorMsgUsername] = useState("");

	const dispatch = useDispatch();

	const switchLabelUsername = (isError) => {
		if (isError) {
			return errorMsgUsername;
		} else {
			return "Username";
		}
	};

	const switchLabelPin = (isError) => {
		if (isError) {
			return errorMsgPin;
		} else {
			return "PIN";
		}
	};

	const navigate = useNavigate();

	const navigateRegister = () => {
		navigate("/register");
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);
		setErrorUsername(false);
		setErrorPin(false);
		setErrorMsgUsername("");
		setErrorMsgPin("");
		const data = new FormData(event.currentTarget);

		axios
			.post("http://localhost:8080/api/users/login", {
				username: data.get("username"),
				pin: data.get("pin")
			})
			.then((response) => {
				if (response.status === 200) {
					dispatch(getUser(data.get("username")));
					dispatch(getGlobalMachines());

					setTimeout(() => {
						setLoading(false);
						setColor("success");
					}, 1000);

					setTimeout(() => {
						dispatch(loadToken(response.data.token));
						navigate("/home");
					}, 2500);
				}
			})
			.catch((error) => {
				setTimeout(() => {
					setLoading(false);
					setColor("error");
					if (error.response.status === null) {
						setErrorUsername(true);
						setErrorMsgUsername("Username or PIN is incorrect");
					}
					if (error.response.data.includes("pin")) {
						setErrorPin(true);
						setErrorMsgPin("PIN must a 4 digit number.");
					} else if (error.response.data.includes("username")) {
						setErrorUsername(true);
						setErrorMsgUsername("Username is not allowed to be empty.");
					}

					if (error.response.status === 402) {
						setErrorUsername(true);
						setErrorMsgUsername("User does not exist.");
					}

					if (error.response.status === 300) {
						setErrorPin(true);
						setErrorMsgPin("PIN is required.");
					}

					if (error.response.status === 405) {
						setErrorPin(true);
						setErrorMsgPin("PIN must be 4 digits.");
					}

					if (error.response.status === 401) {
						setErrorPin(true);
						setErrorMsgPin("PIN is incorrect.");
					}
				}, 2500);

				setTimeout(() => {
					setColor("primary");
					setErrorUsername(false);
					setErrorPin(false);
					setErrorMsgUsername("");
					setErrorMsgPin("");
				}, 3500);
			});
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid container component='main' sx={{ height: "100vh" }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage:
							"url(https://educationsnapshots.com/wp-content/uploads/sites/4/2021/10/oregon-state-university-dixon-recreation-center-racquetball-court-conversions-1-1536x1381.jpg)",
						backgroundRepeat: "no-repeat",
						backgroundColor: (t) =>
							t.palette.mode === "light"
								? t.palette.grey[50]
								: t.palette.grey[900],
						backgroundSize: "cover",
						backgroundPosition: "center"
					}}
				/>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: "flex",
							flexDirection: "column",
							alignItems: "center"
						}}>
						<Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
							<FitnessCenter />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Login
						</Typography>
						<Box
							component='form'
							noValidate
							onSubmit={handleSubmit}
							sx={{ mt: 1 }}>
							<TextField
								error={errorUsername}
								margin='normal'
								required
								fullWidth
								id='username'
								label={switchLabelUsername(errorUsername)}
								name='username'
								autoComplete='username'
								autoFocus
							/>
							<TextField
								error={errorPin}
								margin='normal'
								required
								fullWidth
								name='pin'
								label={switchLabelPin(errorPin)}
								type='password'
								id='pin'
								autoComplete='current-password'
							/>
							<LoadingButton
								loading={loading}
								loadingPosition='center'
								sx={{ mt: 3, mb: 2 }}
								fullWidth
								color={color}
								type='submit'
								variant='contained'>
								Login
							</LoadingButton>

							<Grid container>
								<Grid item xs>
									<Link variant='body2'>Forgot Pin?</Link>
								</Grid>
								<Grid item>
									<Link
										component='button'
										onClick={navigateRegister}
										variant='body2'>
										Don't have an account? Sign up.
									</Link>
								</Grid>
							</Grid>
							<Copyright sx={{ mt: 5 }} />
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
