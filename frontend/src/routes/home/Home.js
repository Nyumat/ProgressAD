import * as React from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright() {
	return (
		<Typography variant='body2' color='text.secondary' align='center'>
			{"Copyright © "}
			<Link color='inherit' href='https://mui.com/'>
				ProgressAD
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Album() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<main>
				{/* Hero unit */}
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
							Progress at Dixon
						</Typography>
						<Stack
							sx={{ pt: 2, mb: 4 }}
							direction='row'
							spacing={2}
							justifyContent='center'>
							<Button variant='contained'>Start a Workout</Button>
							<Button variant='outlined'>Add New Machine</Button>
						</Stack>
						<Typography
							variant='h5'
							align='center'
							color='text.secondary'
							paragraph>
							Your Recent Workouts
						</Typography>
					</Container>
				</Box>
				<Container sx={{ py: 2 }} maxWidth='md'>
					{/* End hero unit */}
					<Grid container spacing={4}>
						{cards.map((card) => (
							<Grid item key={card} xs={12} sm={6} md={4}>
								<Card
									sx={{
										height: "100%",
										display: "flex",
										flexDirection: "column"
									}}>
									<CardContent sx={{ flexGrow: 1 }}>
										<Typography gutterBottom variant='h5' component='h2'>
											Date of Workout
										</Typography>
									</CardContent>
									<CardActions>
										<Button size='small'>View</Button>
										<Button size='small'>Edit</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</main>
			{/* Footer */}
			<Box sx={{ bgcolor: "background.paper", p: 6 }} component='footer'>
				<Copyright />
			</Box>
			{/* End footer */}
		</ThemeProvider>
	);
}
