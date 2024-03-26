import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/ShowTask.css"; // Import custom CSS file for styling

const ShowTask = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const { state } = useLocation();
  const { user, userEmail } = state || {};
  const navigate = useNavigate();

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const editTask = (taskIndex) => {
    setEditingTaskIndex(taskIndex);
    setEditedTask(user.tasks[taskIndex]);
  };

  const saveTask = (taskIndex) => {
    const updatedUser = updateUserTasks(user, taskIndex, editedTask);
    updateLocalStorageUser(updatedUser);
    setEditingTaskIndex(null);
  };

  const deleteTask = (taskIndex) => {
    const updatedUser = { ...user };
    updatedUser.tasks.splice(taskIndex, 1);
    updateLocalStorageUser(updatedUser);
    setEditingTaskIndex(null);
  };

  const addTask = () => {
    navigate("/admin/addtask", { state: { userEmail: userEmail } });
  };

  const handleChange = (e, key) => {
    setEditedTask({ ...editedTask, [key]: e.target.value });
  };

  const updateUserTasks = (user, taskIndex, updatedTask) => {
    const updatedUser = { ...user };
    updatedUser.tasks[taskIndex] = updatedTask;
    return updatedUser;
  };

  const updateLocalStorageUser = (updatedUser) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const userTasks = user && user.tasks ? user.tasks : [];

  return (
    <div className="container-fluid " style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-2">{/* Sidebar */}</div>
        <div className="col-10">
          {userTasks.length === 0 ? (
            <div className="container">
              <div className="row mt-5 mb-4">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <h1>No Assigned Task</h1>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center">
                  <button className="add-button" onClick={addTask}>
                    +
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="row mt-5 mb-4">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <h2 className="fw-bold">Total tasks: {userTasks.length}</h2>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center">
                  <button className="add-button" onClick={addTask}>
                    +
                  </button>
                </div>
              </div>

              {userTasks.map((task, index) => (
                <div className="row">
                  <div className="col">
                    <div
                      className={`card ${
                        expandedIndex === index ? "mb-3" : "mb-2"
                      }`}
                      style={{
                        width: "vh-100",
                        cursor: "pointer",
                        border: "none",
                        padding: "15px",
                        borderRadius: "20px",
                        backgroundColor: "#5a189a",
                        color: "white",
                      }}
                      onClick={() => toggleExpand(index)}
                      key={index}
                    >
                      <div className="container">
                        <div className="row">
                          <div className="col-md-7">
                            {editingTaskIndex === index ? (
                              <form action="" className="">
                                <input
                                  className="form-control  mb-2"
                                  type="text"
                                  value={editedTask.name}
                                  onChange={(e) => handleChange(e, "name")}
                                />
                                <input
                                  className="form-control mb-2"
                                  type="text"
                                  value={editedTask.dueDate}
                                  onChange={(e) => handleChange(e, "dueDate")}
                                />
                                <textarea
                                  className="form-control mb-2"
                                  type="text"
                                  value={editedTask.description}
                                  onChange={(e) =>
                                    handleChange(e, "description")
                                  }
                                />
                                <button
                                  className="save-button"
                                  onClick={() => saveTask(index)}
                                >
                                  Save
                                </button>
                              </form>
                            ) : (
                              <div className="col-md-12">
                                <h3 className="card-title fw-bold">
                                  {task.name}
                                </h3>
                                <p className="card-text">
                                  <span className="fw-bold">Due Date:</span>{" "}
                                  {formatDate(task.dueDate)}
                                </p>
                                <p className="card-text">
                                  <span className="fw-bold">Status:</span>{" "}
                                  {task.status}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="col-md-5">
                            <div className="d-flex justify-content-evenly  mt-3">
                              <button
                                class="Btn edit"
                                onClick={() => editTask(index)}
                              >
                                Edit
                                <svg class="svg" viewBox="0 0 512 512">
                                  {/*!-- Pencil icon path --> */}
                                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                </svg>
                              </button>

                              <button
                                class="Btn delete"
                                onClick={() => deleteTask(index)}
                              >
                                Delete
                                <svg
                                  class="svg"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#ffffff"
                                    d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>

                        {expandedIndex === index && (
                          <div className="card-body">
                            <p className="card-text">{task.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowTask;
