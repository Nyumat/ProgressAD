import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../../styles/App.css";

function Logout() {
  const seconds = 5;
  const [timeLeft, setTimeLeft] = useState(seconds);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>You have logged out!</h1>
        <h1>Redirecting in {timeLeft} seconds</h1>
      </header>
    </div>
  );
}

export default Logout;
