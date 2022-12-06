import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "../../styles/App.css";
import { logout } from "../../slices/userSlice";
import { unloadWorkout } from "../../slices/workoutSlice";

function Logout() {
  const seconds = 3;
  const [timeLeft, setTimeLeft] = useState(seconds);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `Logout | ${timeLeft} seconds remaining | ProgressAD`;
    localStorage.removeItem("token");
    dispatch(logout());
    dispatch(unloadWorkout());
    if (!timeLeft) {
      navigate("/login");
      return;
    }

    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dispatch, navigate, timeLeft]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Thank you for using ProgressAD!</h1>
        <h1>Redirecting to login in {timeLeft} seconds!</h1>
      </header>
    </div>
  );
}

export default Logout;
