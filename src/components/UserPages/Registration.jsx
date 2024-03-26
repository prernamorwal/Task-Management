import React, { useState } from "react";
import signup from "/assets/signup.png";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "", // ISO code will be stored here
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, phoneNumber } = formData;

    if (!name || !email || !password || !confirmPassword || !phoneNumber) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }
    // Password validation using regular expressions
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      );
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      setError("Email already exists");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      phoneNumber,
      tasks: [],
    };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    setSuccessMessage("Registration successful!");
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    });

    setTimeout(() => {
      window.location.href = "/Task-Management/login";
    }, 2000);
  };

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-md-6 p-5">
          <img className="img-fluid" src={signup} alt="" />
        </div>
        <div className="col-md-6 p-5 ">
          <h1 className="text-start fw-bold">Hii</h1>
          <h5 className="text-start mb-3">Create a new account</h5>
          {successMessage && (
            <p className="alert alert-success">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="tel"
                className="form-control"
                name="phoneNumber"
                placeholder="Phone Number (10 digits)"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 d-grid">
              <button type="submit" className="add-button">
                Sign up
              </button>
            </div>
            {error && <p className="text-danger">{error}</p>}
          </form>
          <div className="col text-center">
            <h5>
              If you already have an account{" "}
              <a href="/Task-Management/">Login</a>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
