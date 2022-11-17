/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";

import Typography from "@mui/material/Typography";

import Skeleton from "@mui/material/Skeleton";
import { getMachinesAtDixon, selectMachines } from "../../slices/dixonSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Machines() {
	const [loading, setLoading] = useState(false);
	const machines = useSelector(selectMachines);
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		dispatch(getMachinesAtDixon());
		setLoading(true);
		setLoading(false);
	}, []);

	return loading === false ? (
		<ImageList variant='masonry' cols={2} gap={1}>
			{machines.map((machine) => (
				<ImageListItem key={machine.machine_id}>
					<ListSubheader
						component='div'
						sx={{
							backgroundColor: `${
								machine.machine_status === true ? "#388e3c" : "#d32f2f"
							}`
						}}>
						{machine.machine_status === true ? (
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
						loading='eager'
					/>
					<ImageListItemBar
						title={machine.machine_name}
						subtitle={<span>{machine.machine_type}</span>}
					/>
				</ImageListItem>
			))}
		</ImageList>
	) : (
		<ImageList variant='masonry' cols={3} gap={8}>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
				<Skeleton
					variant='rectangular'
					width={480}
					height={480}
					animation='wave'
				/>
			))}
		</ImageList>
	);
}
