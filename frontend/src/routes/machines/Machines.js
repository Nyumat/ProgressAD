/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";

import Typography from "@mui/material/Typography";

import Skeleton from "@mui/material/Skeleton";
import { getMachinesAtDixon, selectMachines } from "../../slices/dixonSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Machines() {
	const [loading, setLoading] = useState(true);
	const machines = useSelector(selectMachines);

	// Maybe this will be useful later.
	// let copy = [...machines];
	// const shuffledMachines = copy.sort(() => 0.5 - Math.random());

	const dispatch = useDispatch();

	useLayoutEffect(() => {
		dispatch(getMachinesAtDixon());
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	return loading === false ? (
		<div style={{
			display: "flex",
			border: "2px solid #ffff",
			width: "100%",
			height: "100%",
		}}>
		<ImageList cols={4}>
			<CssBaseline />
			{machines.map((machine, i) => (
				<ImageListItem key={i}>
					<ListSubheader
						component='div'
						sx={{
							backgroundColor: `${
								machine.machine_status === true ? "#388e3c" : "#d32f2f"
							}`
						}}>
						{machine?.machine_status === true ? (
							<Typography variant='h6' component='h2' color='white'>
								Machine Available
							</Typography>
						) : (
							<Typography variant='h6' component='h2' color='white'>
								Machine Unavailable
							</Typography>
						)}
					</ListSubheader>
					<img
						src={`${machine.machine_image}`}
						srcSet={`${machine.machine_image}?w=248&fit=crop&auto=format 1x,
                                    ${machine.machine_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
						alt={machine.machine_name}
						onLoad={() => {
							setLoading(false);
						}}
						loading='lazy'
					/>
					<ImageListItemBar
						title={machine.machine_name}
						subtitle={<span>{machine.machine_type}</span>}
					/>
				</ImageListItem>
			))}
			</ImageList>
		</div>
	) : (
		<ImageList variant='masonry' cols={4}>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
				<Skeleton
					variant='rectangular'
					width={480}
					height={480}
					animation='wave'
					sx={{ bgcolor: "#424242" }}
				/>
			))}
		</ImageList>
	);
}
