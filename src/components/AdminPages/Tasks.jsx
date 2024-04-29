import React, { useState, useEffect } from "react";

const Tasks = () => {
  // State variables to manage users, tasks, and selected status
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Effect to fetch users and tasks from localStorage on component mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    // Extract tasks from all users and flatten them into a single array
    const allTasks = storedUsers.reduce((accumulator, currentUser) => {
      if (currentUser.tasks && currentUser.tasks.length > 0) {
        accumulator.push(...currentUser.tasks);
      }
      return accumulator;
    }, []);

    setTasks(allTasks);
  }, []);

  // Function to generate an array of user indices based on the number of tasks
  const generateUserIndices = () => {
    let indices = [];
    let taskCount = 0;
    for (let i = 0; i < users.length; i++) {
      const userTaskCount = users[i].tasks ? users[i].tasks.length : 0;
      for (let j = 0; j < userTaskCount; j++) {
        indices.push(i);
        taskCount++;
      }
    }
    return indices;
  };

  // Get an array of user indices based on the number of tasks
  const userIndices = generateUserIndices();

  // Function to filter tasks based on selected status
  const filteredTasks = tasks.filter((task) => {
    if (selectedStatus === "all") {
      return true;
    } else {
      return task.status === selectedStatus;
    }
  });

  // Function to format date as "20 Jan 2024"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  // Function to toggle card expansion
  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="container-fluid " style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-2">{/* Sidepanel */}</div>
        <div className="col-10">
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-6">
                <h2 className="fw-bold">Tasks</h2>
                <h5>No. of Tasks: {filteredTasks.length}</h5>
              </div>
              <div className="col-md-6">
                <select
                  className="form-select ms-3"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="progress">Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            {filteredTasks.map((task, index) => (
              <div className="col-lg-6 mb-3" key={index}>
                <div
                  className="card"
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#5a189a",
                    color: "white",
                  }}
                >
                  <div className="card-body">
                    <h3
                      className="card-title fw-bold"
                      style={{ fontSize: "1.5rem" }}
                    >
                      {task.name}
                    </h3>{" "}
                    <p className="card-text" style={{ fontSize: "1rem" }}>
                      {task.description}
                    </p>
                    {expandedIndex === index && (
                      <>
                        <p className="card-text" style={{ fontSize: "1rem" }}>
                          <span className="fw-bold">Status :</span>{" "}
                          {task.status}
                        </p>
                        <div className="row">
                          <div className="col-6 d-flex justify-content-start flex-column">
                            <p
                              className="card-text"
                              style={{ fontSize: "1rem" }}
                            >
                              <span className="fw-bold">Assigned To </span>
                              <p>{users[userIndices[index]].name}</p>
                            </p>
                          </div>

                          <div className="col-6 d-flex justify-content-end">
                            <p
                              className="card-text"
                              style={{ fontSize: "1rem" }}
                            >
                              <span className="fw-bold">Due Date </span>{" "}
                              <p>{formatDate(task.dueDate)}</p>
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                    <button
                      className="beautiful-button"
                      onClick={() => toggleExpand(index)}
                    >
                      {expandedIndex === index ? "View Less" : "View More"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
