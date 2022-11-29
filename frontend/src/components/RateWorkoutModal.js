import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { selectUser } from "../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { endWorkout, rateWorkout } from "../slices/workoutSlice";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function RateWorkoutModal() {
	const [loading, setLoading] = useState(false);
	const [color, setColor] = useState("primary");

	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const [effortLevel, setEffortLevel] = React.useState(0);
	const [tirednessLevel, setTirednessLevel] = React.useState(0);

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
		setEffortLevel(0);
		setTirednessLevel(0);
		setOpen(false);
		setSecondOpen(false);
	};

	const handleSecondClose = () => {
		setLoading(true);
		setSecondOpen(false);

		dispatch(
			rateWorkout({
				username: user.username,
				effortLevel: effortLevel,
				tirednessLevel: tirednessLevel
			})
		);

		setTimeout(() => {
			setLoading(false);
			setColor("success");
			enqueueSnackbar("Thanks for rating your workout!", {
				variant: "success",
				autoHideDuration: 1900,
				preventDuplicate: true
			});
			setTimeout(() => {
				enqueueSnackbar("Redirecting...", {
					variant: "info",
					autoHideDuration: 1900,
					preventDuplicate: true
				});
			}, 1500);
		}, 1500);

		setTimeout(() => {
			handleClick();
		}, 1800);
	};

	const handleClick = () => {
		setTimeout(() => {
			setLoading(false);
			setColor("success");
			dispatch(endWorkout(user.username));
		}, 2800);

		setTimeout(() => {
			navigate("/home");
		}, 3000);
	};

	const handleChange = (event) => {
		setEffortLevel(event.target.value);
	};

	const handleSecondChange = (event) => {
		setTirednessLevel(event.target.value);
	};

	const goBack = () => {
		setSecondOpen(false);
		setOpen(true);
	};

	return (
		<>
			<LoadingButton
				variant='contained'
				onClick={handleClickOpen}
				loading={loading}
				color={color}
				loadingPosition='center'>
				End Workout
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
					Rate Your Workout
				</DialogTitle>
				<DialogContent>
					<Box sx={{ marginTop: 1 }}>
						<DialogContentText
							id='alert-dialog-slide-description'
							sx={{
								marginBottom: 4,
								fontWeight: 600
							}}>
							What effort level did you put in today? (0-10)
						</DialogContentText>

						<Box sx={{ width: 350 }}>
							<Stack
								spacing={2}
								direction='row'
								sx={{ mb: 1 }}
								alignItems='center'>
								<Typography
									id='input-slider'
									gutterBottom
									sx={{
										color: "#ff6f00",
										fontSize: 12,
										whiteSpace: "nowrap",
										fontWeight: 600
									}}>
									Low
								</Typography>
								{/* Weird bug in MUI where the mark isnt fully extended? */}
								<Slider
									sx={{ color: "#ff6f00", height: 15 }}
									aria-label='effortLevel'
									defaultValue={0}
									onChange={handleChange}
									valueLabelDisplay='auto'
									value={effortLevel}
									step={1}
									marks
									min={0}
									max={10}
								/>
								<Typography
									id='input-slider'
									gutterBottom
									sx={{
										color: "#ff6f00",
										fontSize: 12,
										whiteSpace: "nowrap",
										fontWeight: 600
									}}>
									High
								</Typography>
							</Stack>
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
				onClose={handleSecondClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle
					id='alert-dialog-slide-title'
					sx={{
						fontSize: 20,
						fontWeight: 600
					}}>
					Rate Your Workout
				</DialogTitle>
				<DialogContent>
					<Box sx={{ marginTop: 1 }}>
						<DialogContentText
							id='alert-dialog-slide-description'
							sx={{
								marginBottom: 4,
								fontWeight: 600
							}}>
							How tired are you after that workout? (0-10)
						</DialogContentText>

						<Box sx={{ width: 350 }}>
							<Stack
								spacing={2}
								direction='row'
								sx={{ mb: 1 }}
								alignItems='center'>
								<Typography
									id='input-slider'
									gutterBottom
									sx={{
										color: "#ff6f00",
										fontSize: 12,
										whiteSpace: "nowrap",
										fontWeight: 600
									}}>
									Not Tired
								</Typography>
								{/* Weird bug in MUI where the mark isnt fully extended? */}
								<Slider
									sx={{ color: "#ff6f00", height: 15 }}
									aria-label='tirednessLevel'
									defaultValue={0}
									onChange={handleSecondChange}
									valueLabelDisplay='auto'
									value={tirednessLevel}
									step={1}
									marks
									min={0}
									max={10}
								/>
								<Typography
									id='input-slider'
									gutterBottom
									sx={{
										color: "#ff6f00",
										fontSize: 12,
										whiteSpace: "nowrap",
										fontWeight: 600
									}}>
									Tired
								</Typography>
							</Stack>
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={goBack}>Back</Button>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSecondClose}>Submit</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
