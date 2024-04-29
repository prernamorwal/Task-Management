import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Registration from "./components/UserPages/Registration";
import Login from "./components/UserPages/UserLogin";
import ProfileUpdateComponent from "./components/UserPages/ProfileUpdateComponent"; // Import ProfileUpdateComponent

import AddTask from "./components/AdminPages/AddTask";
import AdminSideBarComponent from "./components/AdminPages/AdminSideBarComponent";
import AdminDashboard from "./components/AdminPages/AdminDashboard";
import Users from "./components/AdminPages/Users";
import { fetchUserTasks } from "./utils/api"; // Import fetchUserTasks function
import ShowTask from "./components/AdminPages/ShowTask";
import Tasks from "./components/AdminPages/Tasks";
import UserDashboard from "./components/UserPages/UserDashboard";
import UserSideBarComponent from "./components/UserPages/UserSideBarComponent";
import UserTasks from "./components/UserPages/UserTasks";

const Logout = () => {
  // Clear the user session
  localStorage.removeItem("loggedInUser");

  // Redirect the user to the admin login page
  return <Navigate to="/Task-Management/login" replace />;
};

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loggedInUser) {
      fetchUserTasks(loggedInUser.email)
        .then((data) => setTasks(data))
        .catch((error) => setError(error.message));
    }
  }, [loggedInUser]);

  const isAuthenticated = !!loggedInUser;

  return (
    <Router>
      <div className="App">
        {error && <p>Error: {error}</p>}
        <Routes>
          <Route
            path="/Task-Management/"
            element={
              loggedInUser ? (
                <UserDashboard loggedInUser={loggedInUser} />
              ) : (
                <Navigate to="/Task-Management/login" replace />
              )
            }
          />
          <Route path="/Task-Management/register" element={<Registration />} />
          <Route
            path="/Task-Management/login"
            element={<Login setLoggedInUser={setLoggedInUser} />}
          />
          <Route
            path="/Task-Management/profile-update"
            element={
              isAuthenticated ? (
                <ProfileUpdateComponent />
              ) : (
                <Navigate to="/Task-Management/login" replace />
              )
            }
          />
          <Route
            path="/addtask"
            element={
              isAuthenticated ? (
                <AddTask loggedInUser={loggedInUser} />
              ) : (
                <Navigate to="/Task-Management/login" replace />
              )
            }
          />
          <Route
            path="/user/dashboard"
            element={<UserDashboard loggedInUser={loggedInUser} />}
          />

          <Route path="/admin" element={<AdminSideBarComponent />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="task" element={<Tasks />} />
            <Route path="logout" element={<Logout />} />
            <Route path="showtask" element={<ShowTask />} />
            <Route path="addtask" element={<AddTask />} />
          </Route>

          <Route path="/user" element={<UserSideBarComponent />}>
            <Route
              path="dashboard"
              element={<UserDashboard loggedInUser={loggedInUser} />}
            />
            <Route
              path="task"
              element={
                loggedInUser ? (
                  <UserTasks loggedInUserEmail={loggedInUser.email} />
                ) : (
                  <Navigate to="/Task-Management/login" replace />
                )
              }
            />
            <Route path="logout" element={<Logout />} />
            <Route
              path="profile-update"
              element={
                isAuthenticated ? (
                  <ProfileUpdateComponent loggedInUser={loggedInUser} />
                ) : (
                  <Navigate to="/Task-Management/login" replace />
                )
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
