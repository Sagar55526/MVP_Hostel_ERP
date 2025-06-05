// src/layouts/MainLayout.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
        style={{ width: "250px", height: "100vh" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">Hostel Management</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                "nav-link text-white" + (isActive ? " active bg-primary" : "")
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/beds"
              className={({ isActive }) =>
                "nav-link text-white" + (isActive ? " active bg-primary" : "")
              }
            >
              Cottage Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register-student"
              className={({ isActive }) =>
                "nav-link text-white" + (isActive ? " active bg-primary" : "")
              }
            >
              Register New Student
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/floors"
              className={({ isActive }) =>
                "nav-link text-white" + (isActive ? " active bg-primary" : "")
              }
            >
              Floor Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student-profile"
              className={({ isActive }) =>
                "nav-link text-white" + (isActive ? " active bg-primary" : "")
              }
            >
              Student Profiles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                "nav-link text-white" + (isActive ? " active bg-primary" : "")
              }
            >
              Room Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fees"
              className={({ isActive }) =>
                "nav-link text-white" + (isActive ? " active bg-primary" : "")
              }
            >
              Fee Tracking
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/biometric-logs"
              className={({ isActive }) =>
                "nav-link text-white" + (isActive ? " active bg-primary" : "")
              }
            >
              Biometric Logs
            </NavLink>
          </li>
        </ul>
        <hr />
        <div className="text-white small">&copy; 2025 Hostel Management</div>
      </nav>

      {/* Main Content */}
      <main
        className="flex-grow-1 p-3"
        style={{ minHeight: "100vh", background: "#f8f9fa" }}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
