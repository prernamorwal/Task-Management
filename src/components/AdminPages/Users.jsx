import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
    setFilteredUsers(storedUsers); // Initially set filtered users to all users
  }, []);

  useEffect(() => {
    // Filter users based on selected option
    setFilteredUsers(filterUsers());
  }, [selectedOption, users]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const showTask = (user) => {
    const userEmail = user.email; // Extract user email
    console.log(userEmail);
    navigate("/admin/showtask", { state: { user, userEmail } });
  };

  const filterUsers = () => {
    switch (selectedOption) {
      case "all":
        return users;
      case "today":
        return users.filter((user) => {
          const today = new Date().setHours(0, 0, 0, 0);
          return new Date(user.id).setHours(0, 0, 0, 0) === today;
        });
      case "thisMonth":
        return users.filter((user) => {
          const currentDate = new Date();
          const userDate = new Date(user.id);
          return (
            userDate.getMonth() === currentDate.getMonth() &&
            userDate.getFullYear() === currentDate.getFullYear()
          );
        });
      case "thisYear":
        return users.filter((user) => {
          const currentDate = new Date();
          const userDate = new Date(user.id);
          return userDate.getFullYear() === currentDate.getFullYear();
        });
      default:
        return users;
    }
  };

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div className="row ">
        <div className="col-2">{/* Sidebar */}</div>
        <div className="col-10">
          {/* Main content */}
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-6">
                <h2 className="fw-bold">Users</h2>
                <h5>No of Users: {filteredUsers.length}</h5>
              </div>
              <div className="col-md-6">
                <select
                  className="form-select ms-3"
                  value={selectedOption}
                  onChange={handleSelectChange}
                >
                  <option value="all">All</option>
                  <option value="today">Today</option>
                  <option value="thisMonth">This Month</option>
                  <option value="thisYear">This Year</option>
                </select>
              </div>
            </div>
            <div className="row mt-5">
              {/* Map through filtered users and display each user in a card */}
              {filteredUsers.map((user, index) => (
                <div className="col-lg-4 col-md-6 mb-4" key={index}>
                  <div
                    className="card h-100"
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "#5a189a",
                      color: "white",
                    }}
                  >
                    <div className="card-body d-flex flex-column">
                      <h5
                        className="card-title fw-bold"
                        style={{ fontSize: "1.5rem" }}
                      >
                        {user.name}
                      </h5>
                      <p className="card-text">{user.email}</p>
                      <span>
                        <button
                          className="beautiful-button"
                          onClick={() => showTask(user)}
                        >
                          Tasks
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
