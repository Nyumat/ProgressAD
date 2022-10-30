import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import FormData from "form-data";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}>
			{"Copyright © "}
			<Link color='inherit' href='https://mui.com/'>
				ProgressAD
			</Link>{" "}
			{new Date().getFullYear()}.
		</Typography>
	);
}

const theme = createTheme();

export default function Register() {
	const [errorUsername, setErrorUsername] = useState(false);
	const [errorPin, setErrorPin] = useState(false);
	const [errorMsgPin, setErrorMsgPin] = useState("");
	const [errorMsgUsername, setErrorMsgUsername] = useState("");

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
			return "Create PIN";
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setErrorUsername(false);
		setErrorPin(false);
		setErrorMsgUsername("");
		setErrorMsgPin("");
		const data = new FormData(event.currentTarget);
		axios
			.post("http://localhost:8080/api/users/register", {
				username: data.get("username"),
				pin: data.get("pin")
			})
			.then((response) => {
				if (response.status === 200) {
					window.location.href = "/login";
				}
			})
			.catch((error) => {
				if (error.response.status === 406) {
					setErrorUsername(true);
					setErrorMsgUsername("Username already exists!");
				} else if (error.response.status === 405) {
					setErrorPin(true);
					setErrorMsgPin("Pin isn't 4 numbers!");
				}
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
							"url(https://www.precor.com/sites/default/files/success_images/Precor-OSU-Dixon-Rec-Center.jpg)",
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
						<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Register
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

							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}>
								Register
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href='#' variant='body2'>
										Forgot your Pin?
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
