import React, { useEffect } from "react";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentWorkout, toggleMachineUse } from "../slices/workoutSlice";
import { toggleDixonMachineStatus } from "../slices/dixonSlice";

export default function MachineUseToggle({ machine_id, username }) {
	const currentWorkout = useSelector(selectCurrentWorkout);
	const dispatch = useDispatch();

	const machine = currentWorkout.machines.find(
		(machine) => machine.machine_id === machine_id
	);

	const [inUse, setInUse] = React.useState(machine.machine_status !== true);

	const handleChange = (event) => {
		dispatch(toggleMachineUse({ machine_id: machine_id }));
		dispatch(
			toggleDixonMachineStatus({ machine_id: machine_id, username: username })
		);
		setInUse(event.target.checked);
	};

	useEffect(() => {
		setInUse(machine.machine_status !== true);
	}, [machine.machine_status, machine_id, dispatch]);

	return (
		<Switch
			checked={inUse}
			onChange={handleChange}
			inputProps={{ "aria-label": "controlled" }}
		/>
	);
}
