/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Modal from "../../components/Modal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { getWorkout } from "../../slices/workoutSlice";
import moment from "moment";
import { selectUser } from "../../slices/userSlice";
import { capitalizeFirstLetter } from "../../scripts/global";

function Copyright() {
	return (
		<Typography variant='body2' color='text.secondary' align='center'>
			{"Copyright © "}
			<Link
				color='inherit'
				href='https://github.com/TrackMeAtDixon/Progress#readme'>
				ProgressAD
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const theme = createTheme();

export default function Home() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const workout = useSelector((state) => state.workout);

	const recentWorkouts = workout.completedWorkouts;

	useEffect(() => {
		dispatch(getWorkout(user.username));
	}, [user.username]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<main>
				<Box
					sx={{
						bgcolor: "background.paper",
						pt: 8,
						pb: 6
					}}>
					<Container maxWidth='sm'>
						<Typography
							component={"div"}
							variant='h2'
							align='center'
							color='text.primary'
							gutterBottom>
							Progress At Dixon
						</Typography>
						<Stack
							sx={{ pt: 2, mb: 4 }}
							direction='row'
							spacing={2}
							justifyContent='center'>
							<Modal />
						</Stack>
						<Typography
							variant='h5'
							align='center'
							color='text.secondary'
							component={"div"}>
							{capitalizeFirstLetter(user.username)}'s Recent Workouts
						</Typography>
					</Container>
				</Box>
				<Container sx={{ py: 2 }} maxWidth='md'>
					<Grid container spacing={4}>
						{recentWorkouts.map((workout) => (
							<Grid item key={workout._id} xs={12} sm={6} md={4}>
								<Card
									sx={{
										height: "100%",
										display: "flex",
										flexDirection: "column"
									}}>
									<CardContent sx={{ flexGrow: 1 }}>
										<Typography
											gutterBottom
											variant='h5'
											component={"div"}
											sx={{
												fontSize: "1.5rem",
												color: "black",
												textAlign: "center",
												wordWrap: "break-word",
												overflowWrap: "break-word",
												hyphens: "auto"
											}}>
											{moment(workout.workoutStartTimestamp).calendar()}
										</Typography>
										<Typography>
											<Typography
												sx={{
													fontSize: "1rem",
													color: "grey",
													textAlign: "center"
												}}
												variant='body2'
												color='text.secondary'
												component={"div"}>
												Type: {workout.workOutType}
											</Typography>
											<Typography
												sx={{
													fontSize: "1rem",
													color: "grey",
													textAlign: "center"
												}}
												variant='body2'
												color='text.secondary'
												component={"div"}>
												Intensity: {workout.workOutIntensity}
											</Typography>
										</Typography>
										<Typography sx={{ mt: 2 }}>
											<Typography
												sx={{
													fontSize: "1rem",
													color: "grey",
													textAlign: "center"
												}}
												variant='body2'
												color='text.secondary'
												component={"div"}>
												Machines Used:
											</Typography>
											{workout.machines.length === 0 ? (
												<Typography
													sx={{
														fontSize: "1rem",
														color: "grey",
														textAlign: "center"
													}}
													variant='body2'
													color='text.secondary'
													component={"div"}>
													None
												</Typography>
											) : (
												(workout.machines
													? workout.machines.filter(
															(machine, index, self) =>
																self.findIndex(
																	(t) => t.machine_type === machine.machine_type
																) === index
													  )
													: []
												).map((machine, index) => (
													<Typography
														key={index}
														sx={{
															fontSize: "1rem",
															color: "grey",
															textAlign: "center"
														}}
														variant='body2'
														color='text.secondary'
														component={"div"}>
														{machine.machine_name}
													</Typography>
												))
											)}
										</Typography>
									</CardContent>
									<CardActions>
										<Button size='small'>View</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</main>
			<Box sx={{ bgcolor: "background.paper", p: 6 }} component='div'>
				<Copyright />
			</Box>
		</ThemeProvider>
	);
}
