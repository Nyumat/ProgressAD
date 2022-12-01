/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import StartWorkoutModal from "../../components/StartWorkoutModal";
import { useSelector, useDispatch } from "react-redux";
import { getWorkout } from "../../slices/workoutSlice";
import moment from "moment";
import { selectUser } from "../../slices/userSlice";
import { capitalizeFirstLetter } from "../../scripts/global";

function Copyright() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link
          color="inherit"
          href="https://github.com/TrackMeAtDixon/Progress#readme"
          sx={{
            textDecoration: "none",
            borderRadius: "4px",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#ff6f00",
              color: "white",
            },
          }}
        >
          ProgressAD
        </Link>{" "}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const workout = useSelector((state) => state.workout);

  const recentWorkouts = workout.completedWorkouts;

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(
      user.username
    )}'s Home Page | ProgressAD`;
    document.body.style.overflow = "scroll";
    dispatch(getWorkout(user.username));
  }, [user.username, dispatch]);

  return (
    <div
      style={{
        minHeight: "100vh",
        border: "1px solid #ff6f00",
      }}
    >
      <main sx={{
      }}>
        <Box
          sx={{
            pt: 8,
            pb: 6,
            height: "100%",
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component={"div"}
              variant="h2"
              align="center"
              color="#ff6f00"
              sx={{
                border: 1,
                borderColor: "#ff6f00",
                borderRadius: 10,
                p: 2,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#000",
                  color: "white",
                  borderColor: "#ffff",
                },
              }}
              gutterBottom
            >
              Progress At Dixon
            </Typography>
            <Stack
              sx={{ pt: 2, mb: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <StartWorkoutModal />
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
              <Typography
                variant="h5"
                align="center"
                color="white"
                border={1}
                mx={2}
                px={4}
                py={1.5}
                borderRadius={10}
                sx={{
                  textDecoration: "underline",
                  lineHeight: 1.5,
                  textDecorationColor: "#ff6f00",
                  textUnderlineOffset: "0.2em",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#000",
                    color: "white",
                    borderColor: "#ffff",
                  },
                }}
                width="max-content"
                borderColor="#ff6f00"
                component={"div"}
              >
                {capitalizeFirstLetter(user.username)}'s Recent Workouts
              </Typography>
            </Box>
          </Container>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="md">
          <Grid container spacing={4}>
            {recentWorkouts.map((workout, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.5s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#000",
                      color: "white",
                      border: "1px solid #ff6f00",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component={"div"}
                      sx={{
                        fontSize: "1.5rem",
                        color: "#ff6f00",
                        textAlign: "center",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        hyphens: "auto",
                      }}
                    >
                      {moment(workout.workoutStartTimestamp).calendar()}
                    </Typography>
                    <Typography>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          color: "grey",
                          textAlign: "center",
                        }}
                        variant="body2"
                        color="text.secondary"
                        component={"div"}
                      >
                        Type: {workout.workOutType}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          color: "grey",
                          textAlign: "center",
                        }}
                        variant="body2"
                        color="text.secondary"
                        component={"div"}
                      >
                        Intensity: {workout.workOutIntensity}
                      </Typography>
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          color: "grey",
                          textAlign: "center",
                        }}
                        variant="body2"
                        color="text.secondary"
                        component={"div"}
                      >
                        Machines Used:
                      </Typography>
                      {workout.machines.length === 0 ? (
                        <Typography
                          sx={{
                            fontSize: "1rem",
                            color: "grey",
                            textAlign: "center",
                          }}
                          variant="body2"
                          color="text.secondary"
                          component={"div"}
                        >
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
                              textAlign: "center",
                            }}
                            variant="body2"
                            color="text.secondary"
                            component={"div"}
                          >
                            {machine.machine_name}
                          </Typography>
                        ))
                      )}
                    </Typography>
                    <Stack direction="column" spacing={0} sx={{ mt: 2 }}>
                      {workout.tiredNessLevel ? (
                        <>
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "grey",
                              textAlign: "center",
                            }}
                            variant="body2"
                            color="text.secondary"
                            component={"div"}
                          >
                            Tiredness Level:
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "grey",
                              textAlign: "center",
                            }}
                            variant="body2"
                            color="text.secondary"
                            component={"div"}
                          >
                            Tiredness Level: <br></br> None
                          </Typography>
                        </>
                      )}
                      {workout.effortLevel ? (
                        <>
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "grey",
                              textAlign: "center",
                            }}
                            variant="body2"
                            color="text.secondary"
                            component={"div"}
                          >
                            Effort Level:<br></br>
                            {workout.effortLevel}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "grey",
                              textAlign: "center",
                            }}
                            variant="body2"
                            color="text.secondary"
                            component={"div"}
                          >
                            Effort Level: <br></br> None
                          </Typography>
                        </>
                      )}
                      {workout.workoutExercises?.length !== 0 ? (
                        <>
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "grey",
                              textAlign: "center",
                              mt: 1.5,
                            }}
                            variant="body2"
                            color="text.secondary"
                            component={"div"}
                          >
                            Exercises:
                          </Typography>
                          {workout.workoutExercises.map((exercise) => (
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                color: "grey",
                                textAlign: "center",
                              }}
                              variant="body2"
                              color="text.secondary"
                              component={"div"}
                            >
                              {exercise.exercise_name}
                            </Typography>
                          ))}
                        </>
                      ) : (
                        <>
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "grey",
                              textAlign: "center",
                            }}
                            variant="body2"
                            color="text.secondary"
                            component={"div"}
                          >
                            Exercises: <br></br> None
                          </Typography>
                        </>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="div">
        <Copyright />
      </Box>
    </div>
  );
}
