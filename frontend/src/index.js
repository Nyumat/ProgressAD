import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInSide from './routes/login/Login';
import Register from './routes/register/Register';


function ProgressAD() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><App/></>} />
        <Route path="/login" element={<><SignInSide /></>} />
        <Route path="/register" element={<><Register/></>} />
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProgressAD />
  </React.StrictMode>
);

