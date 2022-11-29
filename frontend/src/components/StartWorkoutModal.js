import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Radio, RadioGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { selectUser } from "../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { createWorkout } from "../slices/workoutSlice";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function StartWorkoutModal() {
	const [loading, setLoading] = useState(false);
	const [color, setColor] = useState("primary");

	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const [value, setValue] = React.useState("");
	const [secondValue, setSecondValue] = React.useState("");

	const [open, setOpen] = React.useState(false);
	const [secondOpen, setSecondOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleSecondClickOpen = () => {
		setOpen(false);
		setSecondOpen(true);
	};

	const handleClose = () => {
		setValue("");
		setSecondValue("");
		setOpen(false);
		setSecondOpen(false);
	};

	const handleSecondClose = () => {
		setLoading(true);
		setSecondOpen(false);

		dispatch(
			createWorkout({
				username: user.username,
				workOutType: value,
				workOutIntensity: secondValue
			})
		);

		setTimeout(() => {
			setLoading(false);
			setColor("success");
			enqueueSnackbar("Workout Created!", {
				variant: "success",
				autoHideDuration: 1300,
				preventDuplicate: true
			});
		}, 1500);

		setTimeout(() => {
			navigate("/workout");
		}, 2800);
	};

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const handleSecondChange = (event) => {
		setSecondValue(event.target.value);
	};

	const goBack = () => {
		setSecondOpen(false);
		setOpen(true);
	};

	return (
		<>
			<LoadingButton
				loading={loading}
				loadingPosition='center'
				variant='contained'
				color={color}
				onClick={handleClickOpen}>
				Start Workout
			</LoadingButton>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle id='alert-dialog-slide-title'>
					Begin A New Workout
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						<FormControl component={"span"}>
							<FormLabel>Workout Type</FormLabel>
							<RadioGroup
								sx={{
									display: "flex",
									flexDirection: "row",
									mt: 2,
									mb: -2,
									ml: 2
								}}
								aria-label='workoutType'
								defaultValue='Cardio'
								component='span'
								name='radio-buttons-group'
								value={value}
								onChange={handleChange}>
								<FormControlLabel
									value='Cardio'
									control={<Radio />}
									label='Cardio'
								/>
								<FormControlLabel
									value='Strength'
									control={<Radio />}
									label='Strength'
								/>
								<FormControlLabel
									value='Other'
									control={<Radio />}
									label='Other'
								/>
							</RadioGroup>
						</FormControl>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSecondClickOpen}>Next</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={secondOpen}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleSecondClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle id='alert-dialog-slide-title'>
					Begin A New Workout
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						<FormControl component={"span"}>
							<FormLabel component={"span"}>Workout Intensity</FormLabel>
							<RadioGroup
								sx={{
									display: "flex",
									flexDirection: "row",
									mt: 2,
									mb: -2,
									ml: 2
								}}
								aria-label='workoutIntensity'
								defaultValue='Low'
								component={"label"}
								name='radio-buttons-group'
								value={secondValue}
								onChange={handleSecondChange}>
								<FormControlLabel value='Low' control={<Radio />} label='Low' />
								<FormControlLabel
									value='Medium'
									control={<Radio />}
									label='Medium'
								/>
								<FormControlLabel
									value='High'
									control={<Radio />}
									label='High'
								/>
							</RadioGroup>
						</FormControl>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={goBack}>Back</Button>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSecondClose}>Start</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
