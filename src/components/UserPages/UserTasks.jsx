import React, { useState, useEffect } from "react";
import "../../css/Users.css"; // Import custom CSS file for styling

const UserTasks = ({ loggedInUserEmail }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    // Fetch tasks from local storage for the logged-in user
    const userData = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = userData.find(
      (user) => user.email === loggedInUserEmail
    );

    if (loggedInUser) {
      setTasks(loggedInUser.tasks || []);
    }
  }, [loggedInUserEmail]); // Remove the empty dependency array

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleStatusChange = (taskId, newStatus) => {
    // Update the status of the task in local storage
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    // Update local storage
    const updatedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUserData = updatedUsers.map((user) => {
      if (user.email === loggedInUserEmail) {
        return { ...user, tasks: updatedTasks };
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUserData));

    // Update the tasks state
    setTasks(updatedTasks);
  };

  const filterTasks = (task) => {
    if (selectedFilter === "all") {
      return true;
    }
    return task.status === selectedFilter;
  };

  const getTotalTasksLength = (status) => {
    if (status === "all") {
      return tasks.length;
    }
    return tasks.filter((task) => task.status === status).length;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <div className="container-fluid mt-5" style={{ minHeight: "100vh" }}>
      <div className="row ">
        <div className="col-2">{/* Sidebar Content Goes Here */}</div>
        <div className="col-10 ">
          <div style={{ paddingLeft: "15px" }}>
            <div className="row align-items-center justify-content-evenly mb-3">
              <div className="col-md-6">
                <h2 className="fw-bold">Tasks</h2>
                <h5>Total Tasks: {getTotalTasksLength(selectedFilter)}</h5>
              </div>
              <div className="col-md-6">
                <select
                  value={selectedFilter}
                  onChange={handleFilterChange}
                  className="form-select"
                >
                  <option value="all">All</option>
                  <option value="progress">Progress</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Tasks Data */}
            <div className="row">
              {tasks.filter(filterTasks).map((task) => (
                <div key={task.id} className="col-lg-6 mb-3">
                  <div
                    className="card p-4"
                    style={{
                      borderRadius: "40px",
                      backgroundColor: "#5a189a",
                      color: "white",
                    }}
                  >
                    <h3 className="fw-bold">{task.name}</h3>
                    <p>
                      <span className="fw-bold">Due date :</span>{" "}
                      {formatDate(task.dueDate)}
                    </p>
                    <p>
                      <span className="fw-bold">Description :</span>{" "}
                      {task.description}
                    </p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span>Status : </span>{" "}
                      {/* Add a non-breaking space here */}
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value)
                        }
                        className="form-select ml-2"
                        style={{ width: "50%" }}
                      >
                        <option value="progress">Progress</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
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

export default UserTasks;
