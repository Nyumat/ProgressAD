import React, { useEffect } from "react";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentWorkout, toggleMachineUse } from "../slices/workoutSlice";
import { toggleDixonMachineStatus, selectMachines } from "../slices/dixonSlice";
import { useSnackbar } from "notistack";

export default function MachineUseToggle({ machine_id, username }) {
	const currentWorkout = useSelector(selectCurrentWorkout);
	const dispatch = useDispatch();

	const { enqueueSnackbar } = useSnackbar();

	const machine = currentWorkout.machines.find(
		(machine) => machine.machine_id === machine_id
	);

	const [inUse, setInUse] = React.useState(machine.machine_status !== true);

	const dixonMachines = useSelector(selectMachines);
	const handleChange = (event) => {
	
	if (
		dixonMachines.find((machine) => machine.machine_id === machine_id)
		.machine_status === false &&
		machine.machine_status === true
		) {
			enqueueSnackbar("Machine is currently being used by someone else!", {
				variant: "error",
				autoHideDuration: 1300,
				preventDuplicate: true
			});
			return;
		}

		dispatch(toggleMachineUse({ machine_id: machine_id }));
		dispatch(
			toggleDixonMachineStatus({ machine_id: machine_id, username: username })
		);

		setInUse(event.target.checked);
	};

	useEffect(() => {
		setInUse(machine.machine_status !== true);
	}, [machine.machine_status]);

	return (
		<Switch
			checked={inUse}
			onChange={handleChange}
			inputProps={{ "aria-label": "controlled" }}
		/>
	);
}
