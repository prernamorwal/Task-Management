import React, { useState, useEffect } from "react";
import tasksImage from "/assets/tasks.png";
import usersImage from "/assets/users.png";
import AdminSideBarComponent from "../AdminPages/AdminSideBarComponent";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    // Fetch user data from localStorage
    const usersData = JSON.parse(localStorage.getItem("users")) || [];

    if (Array.isArray(usersData)) {
      setUserCount(usersData.length);

      // Calculate total number of tasks
      let totalTasks = 0;
      usersData.forEach((user) => {
        totalTasks += user.tasks ? user.tasks.length : 0;
      });
      setTaskCount(totalTasks);
    } else {
      console.error(
        "Data fetched from localStorage is not an array:",
        usersData
      );
    }
  }, []);

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div className="row mt-5">
        <div className="col-2">
          <AdminSideBarComponent />
        </div>
        <div className="col-10">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-6 col-sm-6 mb-4">
                <div className="text-center">
                  <img
                    src={usersImage}
                    alt="Users"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                  <h2 className="fw-bold">Total Users </h2>
                  <h1 style={{ fontSize: "3rem" }}>{userCount}</h1>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 mb-4">
                <div className="text-center">
                  <img
                    src={tasksImage}
                    alt="Tasks"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                  <h2 className="fw-bold">Total Tasks</h2>
                  <h1 style={{ fontSize: "3rem" }}>{taskCount}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
