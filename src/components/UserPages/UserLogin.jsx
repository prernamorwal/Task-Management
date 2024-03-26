// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "/assets/login.png";

const Login = ({ setLoggedInUser }) => {
  const navigate = useNavigate(); // Use the navigate hook for redirection
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Function to handle input change in the form fields

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Check if the username and password are both "admin"
    if (email === "admin@gmail.com" && password === "admin") {
      // Redirect to the admin dashboard
      navigate("/admin/dashboard");
      return;
    }

    // Fetch users from local storage
    const userData = localStorage.getItem("users");

    // Check if user data exists in local storage
    if (!userData) {
      setError("No user data found in local storage");
      return;
    }

    let users;
    try {
      // Parse the user data
      users = JSON.parse(userData);
    } catch (error) {
      setError("Invalid user data in local storage");
      return;
    }

    // If users is not an array, create a new array with the user data
    if (!Array.isArray(users)) {
      users = [users];
    }

    // Find the user in the array of users
    const user = users.find((user) => user.email === email);

    // Check if the user exists
    if (!user) {
      setError("Invalid email");
      return;
    }

    // Check if the password is incorrect
    if (user.password !== password) {
      setError("Invalid password");
      return;
    }

    // Set the logged-in user
    setLoggedInUser(user);

    // Navigate to the dashboard route
    navigate("/user/dashboard");
  };

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-md-6 p-5" style={{ padding: "70px" }}>
          {" "}
          <img className="img-fluid" src={login} alt="" />
        </div>
        <div className="col-md-6 p-5" style={{ padding: "70px" }}>
          <h1 className="text-start fw-bold">Welcome </h1>
          <h5 className="mb-3 text-start">Sign in to continue</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 d-grid">
              <button type="submit" className="add-button" name="login">
                Login
              </button>
            </div>
            {error && <p className="text-danger">{error}</p>}
          </form>

          <div className="col text-center">
            <h5>
              If you do not have an account <Link to="/register">Register</Link>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
