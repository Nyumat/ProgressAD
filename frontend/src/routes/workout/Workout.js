import { Container, Grid, Typography, Box, Stack } from "@mui/material";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentWorkout } from "../../slices/workoutSlice";
import { selectUser } from "../../slices/userSlice";
import { capitalizeFirstLetter } from "../../scripts/global";
import AddMachineModal from "../../components/AddMachineModal";
import { getMachinesAtDixon, selectMachines } from "../../slices/dixonSlice";
import MachineUseToggle from "../../components/MachineUseToggle";
import RateWorkoutModal from "../../components/RateWorkoutModal";
import AddExerciseModal from "../../components/AddExerciseModal";

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

	const renderCardio = (machine) => {
		return (
			<Stack
				sx={{
					pb: 2,
					pt: 1
				}}>
				<Typography variant='h7' color='primary' sx={{ fontWeight: "535" }}>
					Distance:{" "}
					{machine.distance === null || machine.distance === undefined
						? "N/A"
						: machine.distance + " miles"}
				</Typography>
				<Typography variant='h7' color='primary' sx={{ fontWeight: "535" }}>
					Time:{" "}
					{machine.timeSpent === null || machine.timeSpent === undefined
						? "N/A"
						: machine.timeSpent + " minutes"}
				</Typography>
			</Stack>
		);
	};

	function ordinal_suffix_of(i) {
		var j = i % 10,
			k = i % 100;
		if (j === 1 && k !== 11) {
			return i + "st";
		}
		if (j === 2 && k !== 12) {
			return i + "nd";
		}
		if (j === 3 && k !== 13) {
			return i + "rd";
		}
		return i + "th";
	}

	const renderOtherExercises = (machine) => {
		return currentWorkout.workoutExercises?.map((exercise, i) => (
			<Box
				key={i}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					border: "1px solid #ff6f00",
					pt: 2,
					px: 2,
					borderRadius: 10
				}}>
				<Typography variant='h6' align='center' color='white' paragraph>
					{exercise.exercise_name}
				</Typography>
			</Box>
		));
	};

	const renderSets = (sets) => {
		return sets.map((set, i) => {
			return (
				<Stack
					key={i}
					sx={{
						mb: 0.5,
						mt: 0.5
					}}>
					<Typography variant='h6' color='white' sx={{ fontWeight: "535" }}>
						{ordinal_suffix_of(i + 1)} Set
					</Typography>
					<Typography variant='h7' color='primary' sx={{ fontWeight: "535" }}>
						Reps:{" "}
						{set.reps === null || set.reps === undefined
							? "N/A"
							: set.reps + " reps"}
					</Typography>
					<Typography variant='h7' color='primary' sx={{ fontWeight: "535" }}>
						Weight:{" "}
						{set.weight === null || set.weight === undefined
							? "N/A"
							: set.weight + " lbs"}
					</Typography>
				</Stack>
			);
		});
	};

	const renderStrength = (machine) => {
		return (
			<Stack>
				<Typography
					variant='h7'
					color='primary'
					sx={{ fontWeight: "535", pb: 2 }}>
					Sets: {machine.sets.length > 0 ? machine.sets.length : "N/A"}
				</Typography>
				{renderSets(machine.sets) || null}
			</Stack>
		);
	};

	useLayoutEffect(() => {
		dispatch(getMachinesAtDixon());

		return () => {};
	}, [dispatch]);

	return (
		<Container>
			<Grid
				container
				spacing={2}
				sx={{
					minHeight: "100vh",
					maxHeight: "200vh",
					paddingBottom: "10vh"
				}}>
				<Grid item xs={12}>
					<Box
						sx={{
							bgcolor: "background.paper",
							pt: 4,
							pb: 4
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
								<AddExerciseModal />
							</Stack>
							<Typography
								paddingTop={1}
								paddingBottom={1}
								variant='h5'
								align='center'
								color='white'
								paragraph>
								Exercises Not Done On A Machine:
							</Typography>
							<Stack
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									paddingTop: 2,
									gap: 3
								}}>
								{currentWorkout.workoutExercises? renderOtherExercises() : null}
							</Stack>
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
								Click "Add Machine" To Add A Machine To Your Workout!
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
									<Container
										sx={{
											paddingTop: 1
										}}>
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
										{machine.machine_type === "Cardio"
											? renderCardio(machine)
											: null}
										{machine.machine_type === "Strength"
											? renderStrength(machine)
											: null}
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
