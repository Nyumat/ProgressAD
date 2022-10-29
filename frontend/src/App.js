import "./styles/App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function App() {
  const [data, setData] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello, {data.username}!</h1>
        <br></br>
        <button
          style={{
            fontSize: "1.5rem",
            padding: "0.5rem",
            borderRadius: "0.3rem",
            backgroundColor: "grey",
            color: "white",
          }}
          onClick={() => {
            navigate("/logout");
          }}
        >
          Logout
        </button>
      </header>
    </div>
  );
}

export default App;
