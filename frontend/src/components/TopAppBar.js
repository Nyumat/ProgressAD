import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../scripts/global";

const pages = ["Home", "Reports", "Machines"];
const settings = ["Home", "Profile", "Workout", "Logout"];

export default function TopAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const { enqueueSnackbar } = useSnackbar();

	const navigate = useNavigate();
	const workout = useSelector((state) => state.workout);
	const user = useSelector((state) => state.user);

	const handleOpenNavMenu = (e) => {
		setAnchorElNav(encodeURI.currentTarget);
	};
	const handleOpenUserMenu = (e) => {
		setAnchorElUser(e.currentTarget);
	};

	const handleCloseNavMenu = (e) => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	function stringToColor(string) {
		let hash = 0;
		let i;

		/* eslint-disable no-bitwise */
		for (i = 0; i < string.length; i += 1) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash);
		}

		let color = "#";

		for (i = 0; i < 3; i += 1) {
			const value = (hash >> (i * 8)) & 0xff;
			color += `00${value.toString(16)}`.slice(-2);
		}
		/* eslint-enable no-bitwise */

		return color;
	}

	function stringAvatar(name) {
		return {
			sx: {
				bgcolor: stringToColor(name)
			},
			children: `${capitalizeFirstLetter(name.split(" ")[0][0])}`
		};
	}

	const handleUserMenuNav = (setting) => {
		if (setting === "profile") {
			handleCloseUserMenu();
			navigate("/profile");
		} else if (setting === "workout") {
			if (workout.currentWorkout.username === undefined) {
				enqueueSnackbar("Oops! You have no ongoing workout!", {
					variant: "error",
					autoHideDuration: 2500,
					preventDuplicate: true
				});
				handleCloseUserMenu();
				setTimeout(() => {
					enqueueSnackbar("Tip: Start a workout in the home screen", {
						variant: "info",
						autoHideDuration: 2500,
						preventDuplicate: true
					});
				}, 2800);
				return null;
			} else {
				handleCloseUserMenu();
				navigate("/workout");
			}
		} else if (setting === "logout") {
			handleCloseUserMenu();
			navigate("/logout");
		} else {
			handleCloseUserMenu();
			navigate(setting);
		}
	};

	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<FitnessCenterIcon
						color='secondary'
						sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
					/>
					<Typography
						variant='h6'
						noWrap
						component='div'
						href='/home'
						color='white'
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							textDecoration: "none"
						}}>
						ProgressAD
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left"
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left"
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" }
							}}>
							{pages.map((page) => (
								<MenuItem
									key={page}
									onClick={
										handleCloseNavMenu &&
										(() => navigate("/" + page.toLowerCase()))
									}>
									<Typography
										textAlign='center'
										fontFamily='monospace'
										color='white'>
										{page}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<FitnessCenterIcon
						color='secondary'
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
					/>
					<Typography
						variant='h5'
						noWrap
						component='div'
						color='white'
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							textDecoration: "none"
						}}>
						ProgressAD
					</Typography>
					<Typography
						variant='h3'
						noWrap
						color='secondary'
						component='div'
						sx={{
							mr: 1,
							ml: 0
						}}>
						|
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={
									handleCloseNavMenu &&
									(() => navigate("/" + page.toLowerCase()))
								}
								sx={{
									my: 2,
									display: "block",
									fontFamily: "monospace",
									fontWeight: 700,
									fontSize: "1.2rem",
									letterSpacing: ".1rem",
									color: "#fff"
								}}>
								{page}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Open settings'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar {...stringAvatar(user.username)} />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right"
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right"
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}>
							{settings.map((setting) => (
								<MenuItem
									key={setting}
									onClick={
										handleCloseUserMenu &&
										(() => handleUserMenuNav(setting.toLowerCase()))
									}>
									<Typography textAlign='center'>{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
