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
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	FormHelperText,
	Checkbox,
	FormControlLabel,
	Input,
	Container
} from "@mui/material";

function Copyright(props) {
	return (
		<Typography variant='body2' color='text.secondary' align='center' mt={1}>
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

	const [bloodTypeChar, setBloodTypeChar] = useState("");
	const [bloodTypeRhD, setBloodTypeRhd] = useState("");

	const [weightValue, setWeightValue] = useState(0);
	const [heightValue, setHeightValue] = useState(0);

	const [disabled, setDisabled] = useState(false);

	const handleChangeBTC = (e) => {
		e.preventDefault();
		setBloodTypeChar(e.target.value);
	};

	const handleChangeRhD = (e) => {
		e.preventDefault();
		setBloodTypeRhd(e.target.value);
	};

	const mergeBloodTypeSelections = (btc, rhd) => {
		const mergedTypes = btc + rhd;
		return mergedTypes;
	};

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

	const handleSliderChange = (e, newValue) => {
		setWeightValue(newValue);
	};

	const handleInputChange = (event) => {
		setWeightValue(event.target.value === "" ? "" : Number(event.target.value));
	};

	const handleBlur = () => {
		if (weightValue < 0) {
			setWeightValue(0);
		} else if (weightValue > 100) {
			setWeightValue(100);
		}
	};

	const handleHeightSliderChange = (e, newValue) => {
		setHeightValue(newValue);
	};

	const handleHeightInputChange = (event) => {
		setHeightValue(event.target.value === "" ? "" : Number(event.target.value));
	};

	const handleHeightBlur = () => {
		if (heightValue < 0) {
			setHeightValue(0);
		} else if (heightValue > 100) {
			setHeightValue(100);
		}
	};

	const bodyMassIndex = () => {
		return weightValue / heightValue ** 2;
	};

	const setInputDisabled = (e) => {
		if (disabled === false) setDisabled(true);
		if (disabled === true) setDisabled(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setErrorUsername(false);
		setErrorPin(false);
		setErrorMsgUsername("");
		setErrorMsgPin("");

		// Send this to redux
		console.log(mergeBloodTypeSelections(bloodTypeChar, bloodTypeRhD));
		console.log(bodyMassIndex);

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

	React.useEffect(() => {
		document.body.style.overflow = "hidden";
	}, []);

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

							<Container>
								<FormControl
									sx={{ m: 1.5, ml: 4.5, minWidth: 120 }}
									disabled={disabled}>
									<InputLabel id='demo-simple-select-helper-label'>
										Blood Type
									</InputLabel>
									<Select
										labelId='demo-simple-select-helper-label'
										id='demo-simple-select-helper'
										value={bloodTypeChar}
										label='Blood Type'
										onChange={handleChangeBTC}>
										<MenuItem value=''>
											<em>None</em>
										</MenuItem>
										<MenuItem value={"A"}>A</MenuItem>
										<MenuItem value={"B"}>B</MenuItem>
										<MenuItem value={"AB"}>AB</MenuItem>
										<MenuItem value={"O"}>O</MenuItem>
									</Select>
									<FormHelperText>Letter [A,B,AB,O]</FormHelperText>
								</FormControl>

								<FormControl sx={{ m: 1.5, minWidth: 120 }} disabled={disabled}>
									<InputLabel id='demo-simple-select-helper-label'>
										RhD
									</InputLabel>
									<Select
										labelId='demo-simple-select-helper-label'
										id='demo-simple-select-helper'
										value={bloodTypeRhD}
										label='Rhd'
										onChange={handleChangeRhD}>
										<MenuItem value=''>
											<em>None</em>
										</MenuItem>
										<MenuItem value={"+"}>+</MenuItem>
										<MenuItem value={"-"}>-</MenuItem>
									</Select>
									<FormHelperText>(+) or (-)</FormHelperText>
								</FormControl>
								<Box sx={{ ml: 7.5 }}>
									<FormControlLabel
										control={
											<Checkbox
												defaultValue={!disabled}
												onChange={setInputDisabled}
												color='success'
											/>
										}
										label='I dont know my blood type.'
									/>
								</Box>
							</Container>

							<Box sx={{ width: 400 }}>
								<Typography id='input-slider' gutterBottom>
									Height (inches)
								</Typography>
								<Grid container spacing={2} alignItems='center'>
									<Grid item xs>
										<Slider
											value={typeof heightValue === "number" ? heightValue : 0}
											min={0}
											max={100}
											onChange={handleHeightSliderChange}
											aria-labelledby='input-slider'
										/>
									</Grid>
									<Grid item sx={{ mb: 3 }}>
										<Input
											value={heightValue}
											size='small'
											onChange={handleHeightInputChange}
											onBlur={handleHeightBlur}
											inputProps={{
												"step": 10,
												"min": 0,
												"max": 100,
												"type": "number",
												"aria-labelledby": "input-slider"
											}}
										/>
									</Grid>
								</Grid>
							</Box>

							<Box sx={{ width: 400 }}>
								<Typography id='input-slider' gutterBottom>
									Weight (lbs)
								</Typography>
								<Grid container spacing={2} alignItems='center'>
									<Grid item xs>
										<Slider
											value={typeof weightValue === "number" ? weightValue : 0}
											min={0}
											max={300}
											onChange={handleSliderChange}
											aria-labelledby='input-slider'
										/>
									</Grid>
									<Grid item sx={{ mb: 3 }}>
										<Input
											value={weightValue}
											size='small'
											onChange={handleInputChange}
											onBlur={handleBlur}
											inputProps={{
												"step": 50,
												"min": 0,
												"max": 400,
												"type": "number",
												"aria-labelledby": "input-slider"
											}}
										/>
									</Grid>
								</Grid>
							</Box>

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
							<Copyright />
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
