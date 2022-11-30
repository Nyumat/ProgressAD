import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import {
	FormControl,
	RadioGroup,
	Radio,
	FormControlLabel
} from "@mui/material";
import { selectUser } from "../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {
	addExerciseToWorkout,
	selectCurrentWorkout
} from "../slices/workoutSlice";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";
import { mapMachineNameToMachineType } from "../scripts/global";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function AddExerciseModal() {
	const [loading, setLoading] = useState(false);
	const [color, setColor] = useState("primary");

	const [isNone, setIsNone] = useState(false);
	const [isStrength, setIsStrength] = useState(false);
	const [isCardio, setIsCardio] = useState(false);
	const [isOther, setIsOther] = useState(false);

	const [selectedMachine, setSelectedMachine] = useState("");

	// Cardio
	const [distance, setDistance] = useState("");
	const [timeSpent, setTimeSpent] = useState("");

	// Strength
	const [reps, setReps] = useState("");
	const [sets, setSets] = useState("");
	const [weight, setWeight] = useState("");

	// OTHER
	const [other, setOther] = useState("");

	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const currentWorkout = useSelector(selectCurrentWorkout);

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
		setSelectedMachine("");
		setOpen(false);
		setSecondOpen(false);
	};

	const handleChange = (event) => {
		setSelectedMachine(event.target.value);
		event.target.value === "None" ? setIsNone(true) : setIsNone(false);
		let type = mapMachineNameToMachineType(event.target.value);
		type === "Strength" ? setIsStrength(true) : setIsStrength(false);
		type === "Cardio" ? setIsCardio(true) : setIsCardio(false);
		type === "Other" ? setIsOther(true) : setIsOther(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);

		if (isStrength) {
			console.log({
				username: user.username,
				weight: data.get("weight"),
				reps: data.get("reps"),
				sets: data.get("sets"),
				machineName: selectedMachine
			});
		} else if (isCardio) {
			console.log({
				username: user.username,
				distance: parseInt(data.get("distance")),
				timeSpent: parseInt(data.get("timeSpent")),
				machineName: selectedMachine
			});
		} else {
			console.log({
				username: user.username,
				exercise_name: data.get("exercise_name"),
				machineName: selectedMachine
			});
		}
	};

	const handleClick = (event) => {
		event.preventDefault();

		if (isStrength) {
			console.log({
				username: user.username,
				weight: weight,
				reps: reps,
				sets: sets,
				machineName: selectedMachine
			});
		} else if (isCardio) {
			console.log({
				username: user.username,
				distance: distance,
				timeSpent: timeSpent,
				machineName: selectedMachine
			});
		} else {
			console.log({
				username: user.username,
				exercise_name: other,
				machineName: selectedMachine
			});
		}
	};

	const goBack = () => {
		setSecondOpen(false);
		setOpen(true);
	};

	const showStrength = () => {
		return (
			<Box component='form' onSubmit={handleSubmit}>
				<TextField
					margin='normal'
					required
					fullWidth
					id='reps'
					onChange={(e) => setReps(e.target.value)}
					label='Reps'
					name='reps'
					autoComplete='reps'
					autoFocus
				/>
				<TextField
					margin='normal'
					required
					fullWidth
					id='weight'
					onChange={(e) => setWeight(e.target.value)}
					label='Weight'
					name='weight'
					autoComplete='weight'
					autoFocus
				/>
				<TextField
					margin='normal'
					required
					fullWidth
					id='sets'
					onChange={(e) => setSets(e.target.value)}
					label='Sets'
					name='sets'
					autoComplete='sets'
					autoFocus
				/>
			</Box>
		);
	};

	const showCardio = () => {
		return (
			<Box component='form' onSubmit={handleSubmit}>
				<TextField
					margin='normal'
					required
					fullWidth
					id='distance'
					onChange={(e) => setDistance(e.target.value)}
					label='Distance'
					name='distance'
					autoComplete='distance'
					autoFocus
				/>
				<TextField
					margin='normal'
					required
					fullWidth
					id='timeSpent'
					onChange={(e) => setTimeSpent(e.target.value)}
					label='Time Spent'
					name='timeSpent'
					autoComplete='timeSpent'
					autoFocus
				/>
			</Box>
		);
	};

	const showNone = () => {
		return (
			<Box component='form' onSubmit={handleSubmit}>
				<TextField
					margin='normal'
					required
					fullWidth
					id='exerciseName'
					onChange={(e) => setOther(e.target.value)}
					label='Exercise Name'
					name='exercise_name'
					autoComplete='exercise_name'
					autoFocus
				/>
			</Box>
		);
	};

	return (
		<>
			<LoadingButton
				variant='contained'
				onClick={handleClickOpen}
				loading={loading}
				color={color}
				loadingPosition='center'>
				Add Exercise
			</LoadingButton>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle
					id='alert-dialog-slide-title'
					sx={{
						fontSize: 20,
						fontWeight: 600
					}}>
					Machine Used For Exercise
				</DialogTitle>
				<DialogContent>
					<Box sx={{ marginTop: 1 }}>
						<Box sx={{ width: 350 }}>
							<FormControl component={"span"}>
								<RadioGroup
									sx={{
										display: "flex",
										flexDirection: "row",
										mt: 2,
										mb: -2,
										ml: 2
									}}
									aria-label='machine'
									defaultValue='None'
									component='span'
									name='radio-buttons-group'
									value={selectedMachine}
									onChange={handleChange}>
									{currentWorkout.machines.map((machine) => (
										<FormControlLabel
											value={machine.machine_name}
											control={<Radio />}
											label={machine.machine_name}
										/>
									))}
									<FormControlLabel
										value='None'
										control={<Radio />}
										label='No Machine'
									/>
								</RadioGroup>
							</FormControl>
						</Box>
					</Box>
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
				// onClose={handleSecondClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle
					id='alert-dialog-slide-title'
					sx={{
						fontSize: 20,
						fontWeight: 600
					}}>
					What Exercise Did You Do?
				</DialogTitle>
				<DialogContent>
					<Box sx={{ marginTop: 1 }}>
						<Box sx={{ width: 350 }} component='form' onSubmit={handleSubmit}>
							{isNone || isOther ? showNone() : null}
							{isStrength ? showStrength() : null}
							{isCardio ? showCardio() : null}
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={goBack}>Back</Button>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClick}>Submit</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
