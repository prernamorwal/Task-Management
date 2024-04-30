import React, { useEffect, useState } from "react";
import UserSideBarComponent from "./UserSideBarComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/Dashboard.css"; // Import custom CSS file for styling
import "react-datepicker/dist/react-datepicker.css";
import progress from "/assets/icons8-progress.gif";
import complete from "/assets/icons8-complete.gif";
import pending from "/assets/icons8-pending.gif";
import total from "/assets/icons8-total.gif";

const Dashboard = ({ loggedInUser }) => {
  const [userName, setUserName] = useState(""); // New state variable for user's name
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [progressTasks, setProgressTasks] = useState(0);
  const [currentMonth, setCurrentMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with current date
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);

  useEffect(() => {
    // Retrieve user data from local storage based on email
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers && loggedInUser && loggedInUser.email) {
      const storedUser = storedUsers.find(
        (user) => user.email === loggedInUser.email
      );
      if (storedUser) {
        // Update state with user data
        setUserName(storedUser.name);
        setTotalTasks(storedUser.tasks.length);
        setCompletedTasks(
          storedUser.tasks.filter((task) => task.status === "completed").length
        );
        setPendingTasks(
          storedUser.tasks.filter((task) => task.status === "pending").length
        );
        setProgressTasks(
          storedUser.tasks.filter((task) => task.status === "progress").length
        );

        // Filter tasks due today
        const currentDate = new Date();
        const tasksDueToday = storedUser.tasks.filter((task) => {
          const dueDate = new Date(task.dueDate);
          return (
            dueDate.getDate() === currentDate.getDate() &&
            dueDate.getMonth() === currentDate.getMonth() &&
            dueDate.getFullYear() === currentDate.getFullYear()
          );
        });
        setTasksForSelectedDate(tasksDueToday);
      }
    }

    // Set current month when the component mounts
    const currentDate = new Date();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();
    setCurrentMonth(`${month} ${year}`);

    // Set selected date to today's date
    setSelectedDate(currentDate);
  }, [loggedInUser]);

  // Function to handle date selection
  const handleDateSelection = (date) => {
    setSelectedDate(date);
    updateTasksForSelectedDate(date);
  };

  // Function to update tasks for the selected date
  const updateTasksForSelectedDate = (date) => {
    if (loggedInUser && loggedInUser.tasks) {
      const tasks = loggedInUser.tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        return dueDate.toDateString() === date.toDateString();
      });
      setTasksForSelectedDate(tasks);
    }
  };
  // Render the dashboard UI once the user is logged in
  return (
    <div className="container-fluid mt-5" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-2">
          <UserSideBarComponent />
        </div>

        <div className="col-10">
          <div className="container">
            {/* Greeting message */}
            <h2 className="mb-4 fw-bold fs-md-1 ">Hello, {userName}</h2>
            {/* Display task statistics */}
            <div className="row">
              <div className="col-md-3 col-6 mb-4">
                <div
                  className="card text-center h-100"
                  style={{
                    borderRadius: "40px",
                    backgroundColor: "#5a189a",
                    color: "white",
                  }}
                >
                  <div className="card-header" style={{ border: "none" }}>
                    Total tasks:
                  </div>
                  <div>
                    <img src={total} alt="" />
                  </div>
                  <div className="card-body fw-bold fs-2">
                    {totalTasks} <span className="fs-5">Tasks</span>{" "}
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6 mb-4">
                <div
                  className="card text-center h-100"
                  style={{
                    borderRadius: "40px",
                    backgroundColor: "#5a189a",
                    color: "white",
                  }}
                >
                  <div className="card-header" style={{ border: "none" }}>
                    Completed:
                  </div>
                  <div>
                    <img src={complete} alt="" />
                  </div>
                  <div className="card-body fw-bold fs-2">
                    {completedTasks} <span className="fs-5">Tasks</span>{" "}
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6 mb-4">
                <div
                  className="card text-center h-100"
                  style={{
                    borderRadius: "40px",
                    backgroundColor: "#5a189a",
                    color: "white",
                  }}
                >
                  <div className="card-header" style={{ border: "none" }}>
                    In progress:
                  </div>
                  <div>
                    <img src={progress} alt="" />
                  </div>
                  <div className="card-body fw-bold fs-2">
                    {progressTasks} <span className="fs-5">Tasks</span>{" "}
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6 mb-4">
                <div
                  className="card text-center h-100"
                  style={{
                    borderRadius: "40px",
                    backgroundColor: "#5a189a",
                    color: "white",
                  }}
                >
                  <div className="card-header" style={{ border: "none" }}>
                    Pending:
                  </div>
                  <div>
                    <img src={pending} alt="" />
                  </div>
                  <div className="card-body fw-bold fs-2">
                    {pendingTasks} <span className="fs-5">Tasks</span>{" "}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 d-flex  justify-content-center">
                {/* Display tasks for the selected date */}
                <div className="mt-5">
                  <h3 className="mb-4">
                    Tasks for{" "}
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                  {tasksForSelectedDate.length > 0 ? (
                    <ul>
                      {tasksForSelectedDate.map((task, index) => (
                        <li key={index}>{task.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No tasks due on this date</p>
                  )}
                </div>
              </div>
              <div className="col-md-6 d-flex  justify-content-center">
                {/* Display date picker */}
                <div className="mt-5 mb-5">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateSelection}
                    inline
                    className="custom-datepicker"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
