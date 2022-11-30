export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export const mapMachineNameToMachineType = (machineName) => {
	switch (machineName) {
		case "Treadmill":
			return "Cardio";
		case "Deadlift":
			return "Strength";
		case "Chest Press":
			return "Strength";
		case "Elliptical":
			return "Cardio";
		case "Lat Pull":
			return "Strength";
		case "Ergometer":
			return "Cardio";
		case "Stair Stepper":
			return "Cardio";
		case "Multi-Exercise":
			return "Other";
		case "Stationary Bike":
			return "Cardio";
		case "Rock Climbing Wall":
			return "Other";
		case "Stretch Trainer":
			return "Other";
		case "Dumbbells":
			return "Strength";
		case "Squat Rack":
			return "Strength";
		case "Normal Treadmill":
			return "Cardio";
		case "Stationary Bike 2":
			return "Cardio";
		default:
			return "Other";
	}
};
