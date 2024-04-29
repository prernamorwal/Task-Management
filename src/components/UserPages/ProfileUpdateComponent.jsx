import React, { useState, useEffect } from "react";

const ProfileUpdateComponent = ({ loggedInUser }) => {
  const [name, setName] = useState(loggedInUser.name);
  const [email, setEmail] = useState(loggedInUser.email);
  const [phoneNumber, setPhoneNumber] = useState(loggedInUser.phoneNumber);
  const [tasks, setTasks] = useState(loggedInUser.tasks); // State for tasks

  useEffect(() => {
    // Fetch user data from localStorage when the component mounts
    const userData = JSON.parse(localStorage.getItem("users"));
    if (userData) {
      const currentUser = userData.find((user) => user.id === loggedInUser.id);
      if (currentUser) {
        setName(currentUser.name);
        setEmail(currentUser.email);
        setPhoneNumber(currentUser.phoneNumber);
        setTasks(currentUser.tasks); // Set tasks from the currentUser
      }
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleSave = () => {
    // Validate phone number
    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    const usersData = JSON.parse(localStorage.getItem("users"));

    const emailExists = usersData.some(
      (user) => user.email === email && user.id !== loggedInUser.id
    );

    if (emailExists) {
      alert("Email already exists. Please choose a different email.");
      return;
    }

    // Create the updated user object with the updated task array
    const updatedUser = {
      ...loggedInUser,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      tasks: tasks, // Include the updated task array
    };

    const userIndex = usersData.findIndex(
      (user) => user.id === loggedInUser.id
    );

    usersData[userIndex] = updatedUser;

    localStorage.setItem("users", JSON.stringify(usersData));

    alert("Profile updated successfully!");
  };

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-2">{/* Sidebar */}</div>
        <div className="col-10">
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
