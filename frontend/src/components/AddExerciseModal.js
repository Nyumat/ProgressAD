/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";
import {
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { selectUser } from "../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  addCardioDataToMachine,
  addExerciseToWorkout,
  addSetsToMachine,
  selectCurrentWorkout,
} from "../slices/workoutSlice";
import { useSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  mapMachineNameToMachineId,
  mapMachineNameToMachineType,
} from "../scripts/global";

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Zoom
      direction="up"
      in={true}
      timeout={1500}
      mountOnEnter
      unmountOnExit
      ref={ref}
      {...props}
    />
  );
});

export default function AddExerciseModal() {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("primary");

  const [isNone, setIsNone] = useState(false);
  const [isStrength, setIsStrength] = useState(false);
  const [isCardio, setIsCardio] = useState(false);
  const [isOther, setIsOther] = useState(false);

  const [selectedMachine, setSelectedMachine] = useState("");

  // Cardio
  const [distance, setDistance] = useState("");
  const [timeSpent, setTimeSpent] = useState("");

  // Strength
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [setsCompleted, setSetsCompleted] = useState([]);
  const [weight, setWeight] = useState("");

  // OTHER
  const [other, setOther] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentWorkout = useSelector(selectCurrentWorkout);

  const [open, setOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSecondClickOpen = () => {
    setOpen(false);
    setSecondOpen(true);
  };

  const handleClose = () => {
    setSelectedMachine("");
    setOpen(false);
    setSets("");
    setReps("");
    setWeight("");
    setDistance("");
    setTimeSpent("");
    setOther("");
    setIsNone(false);
    setIsStrength(false);
    setIsCardio(false);
    setIsOther(false);
    setSecondOpen(false);
  };

  const handleChange = (event) => {
    setSelectedMachine(event.target.value);
    event.target.value === "None" ? setIsNone(true) : setIsNone(false);
    let type = mapMachineNameToMachineType(event.target.value);
    type === "Strength" ? setIsStrength(true) : setIsStrength(false);
    type === "Cardio" ? setIsCardio(true) : setIsCardio(false);
    type === "Other" ? setIsOther(true) : setIsOther(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setLoading(true);

    if (isCardio) {
      if (distance === "" || timeSpent === "") {
        enqueueSnackbar("Fill out all fields!", {
          variant: "error",
          autoHideDuration: 2000,
        });
        setLoading(false);
        return;
      }
      dispatch(
        addCardioDataToMachine({
          username: user.username,
          distance: parseInt(distance),
          timeSpent: parseInt(timeSpent),
          machine_id: mapMachineNameToMachineId(selectedMachine),
        })
      );
      handleClose();
      setTimeout(() => {
        setLoading(false);
        setColor("success");
        enqueueSnackbar("Exercise Added!", {
          variant: "success",
          autoHideDuration: 2000,
          preventDuplicate: true,
        });
      }, 1000);
      setTimeout(() => {
        setColor("primary");
      }, 2000);
    }

    if (isOther || isNone) {
      if (other === "") {
        enqueueSnackbar("Fill out all fields!", {
          variant: "error",
          autoHideDuration: 2000,
        });
        setLoading(false);
        return;
      }
      dispatch(
        addExerciseToWorkout({
          username: user.username,
          exercise_name: other,
          machine_id: mapMachineNameToMachineId(selectedMachine),
        })
      );
      handleClose();
      setTimeout(() => {
        setLoading(false);
        setColor("success");
        enqueueSnackbar("Exercise Added!", {
          variant: "success",
          autoHideDuration: 2000,
          preventDuplicate: true,
        });
      }, 200);
      setTimeout(() => {
        setColor("primary");
      }, 500);
    }
  };

  const goBack = () => {
    setSecondOpen(false);
    setOpen(true);
  };

  const loopSets = () => {
    let setsArray = [];
    for (let i = 0; i < sets; i++) {
      setsArray.push(
        <Grid
          item
          xs={12}
          key={i}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <TextField
            key={i}
            required
            id="reps"
            name="reps"
            label="Reps"
            fullWidth
            autoComplete="off"
            onChange={(e) =>
              setSetsCompleted((prev) => {
                let temp = [...prev];
                temp[i] = { ...temp[i], reps: parseInt(e.target.value) };
                return temp;
              })
            }
          />

          <TextField
            key={i}
            required
            id="weight"
            name="weight"
            label="Weight (lbs)"
            fullWidth
            autoComplete="off"
            onChange={(e) =>
              setSetsCompleted((prev) => {
                let temp = [...prev];
                temp[i] = { ...temp[i], weight: parseInt(e.target.value) };
                return temp;
              })
            }
          />
        </Grid>
      );
      setsArray.push();
    }
    return setsArray;
  };

  const handleAddSets = (e) => {
    e.preventDefault();
    setLoading(true);
    if (isStrength) {
      if (sets === "" || setsCompleted.length === 0) {
        enqueueSnackbar("Fill out all fields!", {
          variant: "error",
          autoHideDuration: 2000,
        });
        setLoading(false);
        return;
      }
      dispatch(
        addSetsToMachine({
          username: user.username,
          sets: setsCompleted,
          machine_id: mapMachineNameToMachineId(selectedMachine),
        })
      );
      handleClose();
      setTimeout(() => {
        setLoading(false);
        setColor("success");
        enqueueSnackbar("Exercise Added!", {
          variant: "success",
          autoHideDuration: 2000,
          preventDuplicate: true,
        });
      }, 2000);
      setTimeout(() => {
        setColor("primary");
      }, 3000);
    }
  };

  // Thanks!
  /* https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number */
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

  const showLoopSets = () => {
    if (sets > 0) {
      let sets = loopSets();
      return (
        <Grid container spacing={3}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              paddingTop: 2,
              marginTop: 2,
              marginLeft: 4,
              fontSize: 19,
              marginBottom: -2,
            }}
          >
            Enter the reps and weight for each set
          </Typography>
          {sets.map((set) => {
            return (
              <Box
                key={set.key}
                component="form"
                sx={{
                  marginLeft: 6,
                  pr: 2,
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    paddingTop: 2,
                    marginTop: 2,
                    marginLeft: 4,
                    fontSize: 19,
                  }}
                >
                  {ordinal_suffix_of(sets.indexOf(set) + 1)} Set
                </Typography>
                <Grid item xs={12} key={set.key}>
                  {set}
                </Grid>
              </Box>
            );
          })}
        </Grid>
      );
    }
  };

  const showSets = () => {
    return (
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="sets"
          onChange={(e) => setSets(e.target.value)}
          label="Sets"
          name="sets"
          autoComplete="off"
          autoFocus
        />
      </Box>
    );
  };

  const showCardio = () => {
    return (
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="distance"
          onChange={(e) => setDistance(e.target.value)}
          label="Distance (in miles)"
          name="distance"
          autoComplete="off"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="timeSpent"
          onChange={(e) => setTimeSpent(e.target.value)}
          label="Time Spent (in minutes)"
          name="timeSpent"
          autoComplete="off"
          autoFocus
        />
      </Box>
    );
  };

  const showNone = () => {
    return (
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="exerciseName"
          onChange={(e) => setOther(e.target.value)}
          label="Name of Exercise"
          name="exercise_name"
          autoComplete="off"
          autoFocus
        />
      </Box>
    );
  };

  return (
    <>
      <LoadingButton
        variant="contained"
        onClick={handleClickOpen}
        loading={loading}
        color={color}
        loadingPosition="center"
      >
        Add Exercise
      </LoadingButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          sx={{
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          Machine Used For Exercise
        </DialogTitle>
        <DialogContent>
          <Box sx={{ marginTop: 1 }}>
            <Box sx={{ width: 350 }}>
              <FormControl component={"span"}>
                <RadioGroup
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    mt: 2,
                    mb: -2,
                    ml: 2,
                  }}
                  aria-label="machine"
                  defaultValue="None"
                  component="span"
                  name="radio-buttons-group"
                  value={selectedMachine}
                  onChange={handleChange}
                >
                  {currentWorkout.machines?.map((machine) => (
                    <FormControlLabel
                      key={machine._id}
                      value={machine.machine_name}
                      control={<Radio />}
                      label={machine.machine_name}
                    />
                  ))}
                  <FormControlLabel
                    value="None"
                    control={<Radio />}
                    label="No Machine"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSecondClickOpen}>Next</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={secondOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          sx={{
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          {selectedMachine === "None" ? "Other Exercise" : selectedMachine}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ marginTop: 1 }}>
            <Box sx={{ width: 350 }}>
              {isNone || isOther ? showNone() : null}
              {isStrength ? showSets() : null}
              {sets > 0 ? showLoopSets() : null}
              {isCardio ? showCardio() : null}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={goBack}>Back</Button>
          <Button onClick={handleClose}>Cancel</Button>
          {isStrength ? (
            <Button onClick={handleAddSets}>Add Sets</Button>
          ) : (
            <Button onClick={handleClick}>Submit</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
