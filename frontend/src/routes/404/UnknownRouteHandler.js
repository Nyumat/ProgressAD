import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const getPreviousRoute = (prevRoute) => {
  switch (prevRoute) {
    case "/login":
      return "login";
    case "/register":
      return "register";
    case "/profile":
      return "profile";
    case "/workout":
      return "workout";
    case "/machines":
      return "machines";
    case "/reports":
      return "reports";
    default:
      return "home";
  }
};
    

const UnknownRouteHandler = ({ to }) => {
  const prevRoute = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {user.username ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/${getPreviousRoute(prevRoute.pathname)}`)}
          >
            Go Back To {getPreviousRoute(prevRoute)}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/logout")}
          >
            Logout Instead
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(to, { state: { prevRoute } })}
          >
            Go Back
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default UnknownRouteHandler;
