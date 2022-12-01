import React from "react";
import { useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { capitalizeFirstLetter } from "../../scripts/global";
import UnknownRouteHandler from "./UnknownRouteHandler";

function FourOhFour({ to }) {
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    document.title = "404 - Page Not Found | ProgressAD";
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        border: "2px solid #f0f0f0",
        boxShadow: "0 0 10px #e0e0e0",
      }}
    >
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
          },
          
        }}
        gutterBottom
      >
        Progress At Dixon
      </Typography>
      <Stack spacing={2}>
        <Typography variant="h1" color="text.primary" fontFamily={"Roboto"}>
          404
        </Typography>
        <Typography variant="h4" color="text.primary" fontFamily={"Roboto"}>
          Page Not Found
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          align="center"
          fontFamily={"Roboto-Light"}
        >
          {` ${
            capitalizeFirstLetter(user.username) || "Error"
          }, the page you are looking for does not exist. `}
        </Typography>

        <UnknownRouteHandler to={to} />
      </Stack>
    </Box>
  );
}

export default FourOhFour;
