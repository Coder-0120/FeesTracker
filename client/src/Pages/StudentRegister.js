import React, { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";

import axios from "axios";
const StudentRegister = () => {
  const navigate = useNavigate();
  const [student, setstudent] = useState({
    name: "",
    rollNumber: "",
    branch: "",
    email: "",
    password: "",
    confirmPassword: "",
    admissionYear: "",
  });

  const handleChange = (e) => {
    setstudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (student.password !== student.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { name, branch, rollNumber, email, password, admissionYear } =
        student;
      const res = await axios.post(
        "http://localhost:5000/api/student/register",
        {
          name,
          branch,
          rollNumber,
          email,
          password,
          admissionYear,
        }
      );

      if (res.data.success) {
        alert("Registration Successful");
        setstudent({
          name: "",
          branch: "",
          rollNumber: "",
          password: "",
          email: "",
          confirmPassword: "",
          admissionYear: "",
        });
        navigate("/student-login");
      } else {
        alert("Registration failed..");
      }
    } catch (err) {
      // console.log("Registration error:", err.message);
      alert("Registration error:");
    }
  };

  return (
    <div className="container mt-5 " >
      <h2 className="mb-4 text-center">Student Registration</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleRegister} className="border p-3 shadow-sm" style={{ backgroundColor: '#9fd1f7ff',borderRadius:"15px" }}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={student.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Roll Number</label>
              <input
                type="text"
                className="form-control"
                name="rollNumber"
                value={student.rollNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Admission Year</label>
              <input
                type="number"
                className="form-control"
                name="admissionYear"
                placeholder="e.g., 2022"
                value={student.admissionYear}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Branch</label>
              <select
                className="form-select"
                name="branch"
                value={student.branch}
                onChange={handleChange}
                required
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={student.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={student.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={student.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
            <p className="text-center mt-3">Already have an account? <Link to="/student-login">Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
