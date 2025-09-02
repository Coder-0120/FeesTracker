import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../Styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"))?.admin;
  const studentInfo = JSON.parse(localStorage.getItem("studentInfo"))?.student;

  const handleLogout = () => {
    if (adminInfo) {
      localStorage.removeItem("adminInfo");
      navigate("/admin-login");
    } else if (studentInfo) {
      localStorage.removeItem("studentInfo");
      navigate("/student-login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm" style={{ position: "sticky", top: 0, zIndex: 1000, background: "linear-gradient(90deg, #1e3c72, #2a5298)" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold  " to="/">FeesTracker</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {!adminInfo && !studentInfo && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin-login">Admin Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student-login">Student Login</Link>
                </li>
                 <li className="nav-item">
                  <Link className="nav-link" to="/student-register">Student Register</Link>
                </li>
              </>
            )}

            {studentInfo && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/student-dashboard">Student Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student-alerts"> Alerts</Link>
                </li>
                
               
                <li className="nav-item">
                  <button className="btn btn-light ms-2" onClick={handleLogout}>Logout (Student)</button>
                </li>
              </>
            )}

            {adminInfo && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-light ms-2" onClick={handleLogout}>Logout (Admin)</button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
