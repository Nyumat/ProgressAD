import { Button, Container, Grid, Typography, Box, Stack } from "@mui/material";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentWorkout } from "../../slices/workoutSlice";
import { selectUser } from "../../slices/userSlice";
import { capitalizeFirstLetter } from "../../scripts/global";
import AddMachineModal from "../../components/AddMachineModal";
import { getMachinesAtDixon, selectMachines } from "../../slices/dixonSlice";
import MachineUseToggle from "../../components/MachineUseToggle";
import RateWorkoutModal from "../../components/RateWorkoutModal";

export default function Workout() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const currentWorkout = useSelector(selectCurrentWorkout);
	const dixonMachines = useSelector(selectMachines);

	const getImageUrl = (machine_id) => {
		const machine = dixonMachines.find(
			(machine) => machine.machine_id === machine_id
		);
		return machine.machine_image;
	};

	useLayoutEffect(() => {
		dispatch(getMachinesAtDixon());

		return () => {};
	}, [dispatch]);

	return (
		<Container>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Box
						sx={{
							bgcolor: "background.paper",
							pt: 8,
							pb: 6
						}}>
						<Container maxWidth='sm'>
							<Typography
								component='h1'
								variant='h2'
								align='center'
								color='text.primary'
								gutterBottom>
								{capitalizeFirstLetter(user.username)}'s Workout
							</Typography>
							<Stack
								sx={{ pt: 2, mb: 4 }}
								direction='row'
								spacing={2}
								justifyContent='center'>
								<RateWorkoutModal />
								<AddMachineModal />
								<Button variant='contained' color='primary'>
									Add Exercise
								</Button>
							</Stack>
							<Typography
								paddingTop={5}
								variant='h5'
								align='center'
								color='white'
								paragraph>
								Machines Used:
							</Typography>
						</Container>
					</Box>
				</Grid>

				<Grid container>
					{currentWorkout.machines.length === 0 ? (
						<Grid
							item
							xs={12}
							sx={{
								pl: 3
							}}>
							<Typography variant='h6' align='center' color='primary'>
								No Machines
							</Typography>
						</Grid>
					) : (
						currentWorkout.machines.map((machine) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={machine.machine_id}>
								<Box
									sx={{
										border: 2,
										borderColor: "#ff6f00",
										borderRadius: 4,
										padding: 1,
										margin: 1,
										textAlign: "center"
									}}>
									<Container>
										<Typography
											variant='h6'
											color='primary'
											sx={{ fontWeight: "535" }}>
											{capitalizeFirstLetter(machine.machine_name)}
										</Typography>
										<MachineUseToggle
											machine_id={machine.machine_id}
											username={user.username}
										/>
									</Container>
									<img
										src={getImageUrl(machine.machine_id)}
										alt={machine.machine_name}
										style={{
											width: "100%",
											height: "100%",
											backgroundSize: "cover"
										}}
									/>
								</Box>
							</Grid>
						))
					)}
				</Grid>
			</Grid>
		</Container>
	);
}
