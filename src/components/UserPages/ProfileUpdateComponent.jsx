import React, { useState } from "react";
import bcrypt from "bcryptjs";

const ProfileUpdateComponent = ({ loggedInUser }) => {
  // Initialize state variables with user data (if available)
  const [name, setName] = useState(loggedInUser.name);
  const [email, setEmail] = useState(loggedInUser.email);
  const [phoneNumber, setPhoneNumber] = useState(loggedInUser.phoneNumber);
  const [password, setPassword] = useState(loggedInUser.password);

  // Function to handle saving updated profile data
  const handleSave = () => {
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const updatedUser = {
      ...loggedInUser,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword, // Store hashed password
    };

    // Retrieve users data from localStorage
    const usersData = JSON.parse(localStorage.getItem("users"));

    // Find the index of the user to update
    const userIndex = usersData.findIndex(
      (user) => user.id === loggedInUser.id
    );

    // Update the user in the usersData array
    usersData[userIndex] = updatedUser;

    // Update users data in localStorage
    localStorage.setItem("users", JSON.stringify(usersData));

    alert("Profile updated successfully!");
  };

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-2">{/* Sidebar */}</div>
        <div className="col-10">
          {/* Main content */}
          <div className="container">
            <div className="row mt-5">
              <h2 className="fw-bold text-center">Update Profile</h2>
            </div>
            <div className="row mt-5 d-flex justify-content-center">
              <div className="col-md-6 mb-4">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button className="save-button" onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateComponent;
