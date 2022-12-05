import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { selectUser } from "../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {
	addMachineToWorkout,
	selectCurrentWorkout,
} from "../slices/workoutSlice";

import { useSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";
import { getMachinesAtDixon, selectMachines } from "../slices/dixonSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function AddMachineModal() {
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const { enqueueSnackbar } = useSnackbar();

	const [value, setValue] = React.useState("");

	const [open, setOpen] = React.useState(false);

	const dixonMachines = useSelector(selectMachines);
	const currentWorkout = useSelector(selectCurrentWorkout);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAddMachine = () => {
		setLoading(true);

		const machine = dixonMachines.find(
			(machine) => machine.machine_id === value
		);
		if (machine.machine_status === false) {
			enqueueSnackbar("Someone else is already using this machine!", {
				variant: "error",
				autoHideDuration: 1300,
				preventDuplicate: true
			});
			setTimeout(() => {
				enqueueSnackbar("Tip: Come back later and the machine may be open.", {
					variant: "info",
					autoHideDuration: 2500,
					preventDuplicate: true
				});
			}, 1500);
			setLoading(false);
			setValue("");
			setOpen(false);
			return;
		}

		if (
			currentWorkout.machines.find((machine) => machine.machine_id === value)
		) {
			enqueueSnackbar("Machine is already in your workout!", {
				variant: "error",
				autoHideDuration: 1300,
				preventDuplicate: true
			});
			setLoading(false);
			setValue("");
			setOpen(false);
			return;
		}


		if (currentWorkout.machines.find((machine) => machine.machine_status === false)) {
			enqueueSnackbar("You are already using a machine!", {
				variant: "warning",
				autoHideDuration: 1300,
				preventDuplicate: true
			});
			setTimeout(() => {
				enqueueSnackbar("Tip: You can add multiple machines to your workout.", {
					variant: "info",
					autoHideDuration: 2500,
					preventDuplicate: true
				});
			}, 1500);
			setLoading(false);
			setValue("");
			setOpen(false);
			return;
		}

		dispatch(
			addMachineToWorkout({
				machine_id: value,
				username: user.username
			})
		);

		setTimeout(() => {
			dispatch(getMachinesAtDixon());
		}, 1000);

		setLoading(false);
		setOpen(false);
		enqueueSnackbar("Machine Added Successfully!", {
			variant: "success",
			autoHideDuration: 2800,
			preventDuplicate: true
		});

		setTimeout(() => {
			enqueueSnackbar(
				"Tip: Use the machine and come back here to log your exercise!",
				{
					variant: "info",
					autoHideDuration: 3800,
					preventDuplicate: true
				}
			);
		}, 2500);

		setValue("");
		setTimeout(() => {}, 2800);
	};

	const handleChange = (event) => {
		console.log(event.target.value);
		setValue(event.target.value);
	};

	return (
		<div>
			<Button variant='contained' color='primary' onClick={handleClickOpen}>
				Add Machine
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle id='alert-dialog-slide-title'>
					Please Select a Machine.
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						id='alert-dialog-slide-description'
						component={"div"}>
						<FormControl>
							<FormLabel component='div'>Machines:</FormLabel>
							<RadioGroup
								sx={{
									display: "flex",
									flexDirection: "column",
									mt: 2,
									mb: -2,
									ml: 2
								}}
								aria-label='workoutType'
								defaultValue='Cardio'
								name='radio-buttons-group'
								component='div'
								value={value}
								onChange={handleChange}>
								{dixonMachines.map((machine) => (
									<ImageListItem key={machine.machine_image}>
										<img
											src={`${machine.machine_image}?w=248&fit=crop&auto=format`}
											srcSet={`${machine.machine_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
											alt={machine.machine_name}
										/>
										<ImageListItemBar
											title={machine.machine_name}
											subtitle={<span>{machine.machine_type}</span>}
											sx={{
												background:
													"linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
													"rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
											}}
											actionIcon={
												<FormControlLabel
													component='div'
													value={machine.machine_id}
													control={<Radio />}
													label=''
												/>
											}
										/>
									</ImageListItem>
								))}
							</RadioGroup>
						</FormControl>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<LoadingButton
						loading={loading}
						loadingPosition='center'
						onClick={handleAddMachine}>
						Add Machine to Workout
					</LoadingButton>
				</DialogActions>
			</Dialog>
		</div>
	);
}
