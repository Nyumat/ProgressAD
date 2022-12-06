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

export const mapMachineNameToMachineId = (machineName) => {
  switch (machineName) {
    case "Treadmill":
      return "bf0fcdcd-d485-4500-8b2b-12e0ef434666";
    case "Deadlift":
      return "521c847f-1097-4f0f-af35-0bea9beb8b52";
    case "Chest Press":
      return "f99537d3-399e-464e-9085-76fedb78b317";
    case "Elliptical":
      return "bbd89b80-3794-4df9-98a5-6de0b096ffb5";
    case "Lat Pull":
      return "c148d40a-4590-40a1-9496-f5b8b7dd0039";
    case "Ergometer":
      return "acbaf58f-b26e-4f9a-90c6-7cc15618eec7";
    case "Stair Stepper":
      return "3ff127a8-83f9-48e4-926e-6c547021725e";
    case "Multi-Exercise":
      return "afdbb0eb-95d2-44df-aa71-6819c52e6d94";
    case "Stationary Bike":
      return "bcf1ea95-c871-4e76-94fd-fdcd65abd499";
    case "Rock Climbing Wall":
      return "2c3d5c49-651c-4c22-ba9a-2621abac1ef9";
    case "Stretch Trainer":
      return "baa6a66c-81ec-41f4-9d26-7848cf0e91c9";
    case "Dumbbells":
      return "a1c720ae-29b5-438d-85b7-b7e49acaa74b";
    case "Squat Rack":
      return "fbc65968-6162-4007-aa38-f24430d3879c";
    case "Normal Treadmill":
      return "0fa79764-f260-4f94-8c97-e84d533fcdf4";
    case "Stationary Bike 2":
      return "8d5a78f7-2b14-44c3-aa99-f00c8422ed1a";
    default:
      return "Not Found";
  }
};
