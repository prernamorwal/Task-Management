import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook

const AddTask = () => {
  const location = useLocation(); // Use useLocation hook to get the location object
  console.log(location.state); // Add this line to check the state object

  const { userEmail } = location.state || {}; // Destructure userEmail from location.state

  // State variables to manage task name, due date, description, and navigation
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  const addTask = () => {
    // Ensure task name, due date, and description are not empty
    console.log("button work");
    console.log(taskName);
    console.log(dueDate);
    console.log(description);
    console.log(userEmail);
    if (
      !taskName.trim() ||
      !dueDate.trim() ||
      !description.trim() ||
      !userEmail
    )
      return;

    // Create a new task object with name, due date, description, and completion status
    const newTask = {
      id: Date.now(),
      name: taskName,
      dueDate: dueDate,
      description: description,
      status: "pending", // Assuming the task is initially not completed
    };

    // Retrieve the existing users data from localStorage
    const usersData = JSON.parse(localStorage.getItem("users")) || [];

    // Update the user object in the users data array
    const updatedUsersData = usersData.map((userData) => {
      if (userData.email === userEmail) {
        // Ensure the user's tasks property exists
        const updatedTasks = (userData.tasks || []).concat(newTask);
        return { ...userData, tasks: updatedTasks };
      }
      return userData;
    });

    // Update the users data in localStorage with the updated users data array
    localStorage.setItem("users", JSON.stringify(updatedUsersData));

    // Clear input fields
    setTaskName("");
    setDueDate("");
    setDescription("");

    // Display the success message
    document.querySelector("#success-message").innerHTML =
      "Successfully Added!!";

    // Hide the success message after 5 seconds
    setTimeout(function () {
      document.querySelector("#success-message").innerHTML = "";
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  return (
    <div className="container-fluid " style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-2">{/* Sidebar */}</div>
        <div className="col-10">
          {/* Main content */}
          <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="row w-md-50 w-100  justify-content-evenly">
              <div className="col-lg-6 ">
                <h2 className="text-center mb-4 fw-bold fs-1">Add Task</h2>
                <p
                  id="success-message"
                  className="text-success fw-bold fs-5 text-center"
                ></p>
                <div className="mb-3">
                  <label className="form-label ">Task Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Due Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description:</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-center">
                  <button onClick={addTask} className="add-button">
                    Add Task
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

export default AddTask;
