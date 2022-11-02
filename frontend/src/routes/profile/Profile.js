import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import Input from "@mui/material/Input";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateProfile } from "../../slices/userSlice";

function Profile() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [username, setUsername] = useState(user.username);
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [age, setAge] = useState(user.age);
	const [weightValue, setWeightValue] = useState(user.weight);
	const [heightValue, setHeightValue] = useState(user.height);

	const [color, setColor] = useState("primary");

	const handleSliderChange = (e, newValue) => {
		setWeightValue(newValue);
	};

	const handleInputChange = (event) => {
		setWeightValue(event.target.value === "" ? "" : Number(event.target.value));
	};

	const handleBlur = () => {
		if (weightValue < 0) {
			setWeightValue(0);
		} else if (weightValue > 600) {
			setWeightValue(weightValue);
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
			setHeightValue(heightValue);
		}
	};

	const bodyMassIndex = () => {
		let BMI = (weightValue * 703) / heightValue ** 2;
		BMI = BMI.toFixed(2);
		BMI = parseFloat(BMI);
		return BMI;
	};

	const updateUserProfile = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setColor("success");
			setMessage("Profile Updated!");
		}, 1500);

		setTimeout(() => {
			setMessage("");
			setColor("primary");
		}, 3500);

		let obj = {
			old_username: user.username,
			username: username,
			weight: weightValue,
			height: heightValue,
			BMI: bodyMassIndex(),
			age: age,
			firstName: firstName,
			lastName: lastName
		};

		dispatch(updateProfile(obj));
	};

	const theme = createTheme();

	useEffect(() => {
		setUsername(user.username);
		setFirstName(user.firstName);
		setLastName(user.lastName);
		setAge(user.age);
		setWeightValue(user.weight);
		setHeightValue(user.height);
	}, [
		user.username,
		user.firstName,
		user.lastName,
		user.age,
		user.weight,
		user.height
	]);

	return (
		<ThemeProvider theme={theme}>
			<Grid container component='main'>
				<CssBaseline />
				<Box
					sx={{
						margin: "auto",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center"
					}}>
					<Box
						component='form'
						noValidate
						sx={{ mt: 5, width: "70%", mx: -20 }}>
						<Typography
							variant='h5'
							component='h1'
							gutterBottom
							sx={{ textAlign: "center", color: "black" }}>
							Edit Your Profile
						</Typography>
						<TextField
							margin='normal'
							fullWidth
							id='username'
							label='Username'
							name='username'
							autoComplete='username'
							autoFocus
							defaultValue={user.username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<TextField
							margin='normal'
							fullWidth
							id='firstName'
							label='First Name'
							name='firstName'
							autoComplete='firstName'
							autoFocus
							defaultValue={user.firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<TextField
							margin='normal'
							fullWidth
							id='lastName'
							label='Last Name'
							name='lastName'
							autoComplete='lastName'
							autoFocus
							defaultValue={user.lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>

						<TextField
							margin='normal'
							fullWidth
							id='age'
							label='Age'
							name='age'
							autoComplete='age'
							autoFocus
							defaultValue={user.age}
							onChange={(e) => setAge(e.target.value)}
						/>

						<Box sx={{ width: 300 }}>
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

						<Box sx={{ width: 300 }}>
							<Typography id='input-slider' gutterBottom>
								Weight (lbs)
							</Typography>
							<Grid container spacing={2} alignItems='center'>
								<Grid item xs>
									<Slider
										value={typeof weightValue === "number" ? weightValue : 0}
										min={0}
										max={600}
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
											"max": 600,
											"type": "number",
											"aria-labelledby": "input-slider"
										}}
									/>
								</Grid>
							</Grid>
							<Typography
								variant='h6'
								component='h1'
								color='text.secondary'
								gutterBottom>
								Your BMI: {bodyMassIndex()}
							</Typography>
						</Box>
						<Box
							sx={{
								mt: 1.5,
								display: "flex",
								justifyContent: "center",
								flexDirection: "column",
								alignItems: "center"
							}}>
							<LoadingButton
								sx={{ mt: 1, mb: 1 }}
								fullWidth
								color={color}
								loading={loading}
								onClick={updateUserProfile}
								variant='contained'>
								Save
							</LoadingButton>
							<Typography sx={{ mt: 1 }} variant='body2' color='text.secondary'>
								{message === "" ? "" : message}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Grid>
		</ThemeProvider>
	);
}

export default Profile;
