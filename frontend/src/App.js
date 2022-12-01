import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import TopAppBar from "./components/TopAppBar";
import Login from "./routes/login/Login";
import Logout from "./routes/logout/Logout";
import Register from "./routes/register/Register";
import Home from "./routes/home/Home";
import Profile from "./routes/profile/Profile";
import Workout from "./routes/workout/Workout";
import Machines from "./routes/machines/Machines";
import Reports from "./routes/reports/Reports";
import FourOhFour from "./routes/404/FourOhFour";
import { useSelector } from "react-redux";
import "./styles/App.css";

function TabBarNavigation() {
  return (
    <>
      <TopAppBar />
      <Outlet />
    </>
  );
}

function StandardNavigation() {
  return <Outlet />;
}

export default function App() {
  const username = useSelector((state) => state.user.username);
  if (!username) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<FourOhFour to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<StandardNavigation />}>
            <Route path="/" element={<Navigate to="/login" replace={true} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="*"
              element={
                <>
                 <FourOhFour to="/" />
                </>
              }
            />
          </Route>
          <Route element={<TabBarNavigation />}>
            <Route path="/home" element={<Home />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/machines"
              element={
                <>
                  <Machines />
                </>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="*"
              element={
                <>
                  <FourOhFour to="/home" />
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
