import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "/assets/login.png";
import bcrypt from "bcryptjs";

const Login = ({ setLoggedInUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email === "admin@gmail.com" && password === "admin") {
      navigate("/admin/dashboard");
      return;
    }

    const userData = localStorage.getItem("users");

    if (!userData) {
      setError("No user data found in local storage");
      return;
    }

    let users;
    try {
      users = JSON.parse(userData);
    } catch (error) {
      setError("Invalid user data in local storage");
      return;
    }

    if (!Array.isArray(users)) {
      users = [users];
    }

    const user = users.find((user) => user.email === email);

    if (!user) {
      setError("Invalid email");
      return;
    }

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      setError("Invalid password");
      return;
    }

    setLoggedInUser(user);
    navigate("/user/dashboard");
  };

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-md-6 p-5" style={{ padding: "70px" }}>
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
              If you do not have an account{" "}
              <Link to="/Task-Management/register">Register</Link>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
