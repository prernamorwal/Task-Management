import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaHome, FaTasks, FaSignOutAlt, FaUserEdit } from "react-icons/fa"; // Import icons
import background1 from "/assets/background1.jpg"; // Import the image
import "../../css/AdminPanel.css";

const UserSideBarComponent = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav
          className="col-2 d-md-block sidebar fixed-top"
          style={{
            backgroundImage: `url(${background1})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item mb-3 mt-3">
                <Link
                  to="/user/dashboard"
                  className={`nav-link ${
                    location.pathname === "/user/dashboard" ? "active" : ""
                  }`}
                >
                  <FaHome className="white" style={{ fontSize: "25px" }} />{" "}
                  <span className="d-none d-md-inline white">Dashboard</span>
                </Link>
              </li>

              <li className="nav-item mb-3">
                <Link
                  to="/user/task"
                  className={`nav-link ${
                    location.pathname === "/user/task" ? "active" : ""
                  }`}
                >
                  <FaTasks className="white" style={{ fontSize: "25px" }} />{" "}
                  <span className="d-none d-md-inline white">Tasks</span>
                </Link>
              </li>

              <li className="nav-item mb-3">
                <Link
                  to="/user/profile-update"
                  className={`nav-link ${
                    location.pathname === "/user/profile-update" ? "active" : ""
                  }`}
                >
                  <FaUserEdit className="white" style={{ fontSize: "25px" }} />{" "}
                  <span className="d-none d-md-inline white">Profile</span>
                </Link>
              </li>

              <li className="nav-item mb-3">
                <Link
                  to="/user/logout"
                  className={`nav-link ${
                    location.pathname === "/user/logout" ? "active" : ""
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

        {/* Main Content */}
        <main role="main" className="col ml-md-auto px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserSideBarComponent;
