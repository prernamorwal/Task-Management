import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaChartBar, FaUsers, FaTasks, FaSignOutAlt } from "react-icons/fa";
import "../../css/AdminPanel.css"; // Import custom CSS file for styling
import background1 from "/assets/background1.jpg"; // Import the image

const AdminPanel = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="container-fluid">
      <div className="row">
        <nav
          className="col-2 sidebar fixed-top"
          style={{
            backgroundImage: `url(${background1})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }} // Use the imported image
        >
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item mb-3 mt-3">
                <Link
                  to="/admin/dashboard"
                  className={`nav-link ${
                    location.pathname === "/admin/dashboard" ? "active" : ""
                  }`}
                >
                  <FaChartBar className="white" style={{ fontSize: "25px" }} />{" "}
                  <span className="d-none d-md-inline white">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link
                  to="/admin/users"
                  className={`nav-link ${
                    location.pathname === "/admin/users" ? "active" : ""
                  }`}
                >
                  <FaUsers className="white" style={{ fontSize: "25px" }} />{" "}
                  <span className="d-none d-md-inline white">Users</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link
                  to="/admin/task"
                  className={`nav-link ${
                    location.pathname === "/admin/task" ? "active" : ""
                  }`}
                >
                  <FaTasks className="white" style={{ fontSize: "25px" }} />{" "}
                  <span className="d-none d-md-inline white">Tasks</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link
                  to="/admin/logout"
                  className={`nav-link ${
                    location.pathname === "/admin/logout" ? "active" : ""
                  }`}
                >
                  <FaSignOutAlt
                    className="white"
                    style={{ fontSize: "25px" }}
                  />{" "}
                  <span className="d-none d-md-inline white">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" className="col ml-md-auto px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
