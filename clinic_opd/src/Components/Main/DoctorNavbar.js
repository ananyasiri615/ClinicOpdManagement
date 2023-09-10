import React from "react";
import { Link, Outlet } from "react-router-dom";

const DoctorNavbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/Doctor/ViewPatient">
                  Our Patients
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Doctor/ViewAndDeleteDoctors">
                  Edit Info
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Doctor/CreateSchedule">
                  Create Schedule
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Doctor/ViewAndDeleteSchedules">
                  Edit Schedule
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Doctor/ViewAppointments">
                  View Appointments
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default DoctorNavbar;
