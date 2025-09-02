import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "../Styles/StudentDashboard.css";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));
  const loginStudent = studentInfo?.student;

  useEffect(() => {
    if (!loginStudent) return;

    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/student/${loginStudent._id}`);
        setStudentData(res.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [loginStudent]);

  if (!loginStudent) return <Navigate to="/student-login" />;
  if (loading) return <div className="text-center mt-5">Loading student data...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Student Dashboard</h2>

      <div className="pd card p-3 mb-4 shadow-sm">
        <h5>Student Details</h5>
        <p><strong>Name:</strong> {studentData.name}</p>
        <p><strong>Roll Number:</strong> {studentData.rollNumber}</p>
        <p><strong>Branch:</strong> {studentData.branch}</p>
        <p><strong>Email:</strong> {studentData.email}</p>
      </div>

      <div className="pd card p-3 shadow-sm" style={{   backgroundImage: "linear-gradient(to bottom right,#41e2fa, #30d6ef, #79e2f2)"
, boxShadow: "5px 5px 15px rgba(207, 27, 27, 0.1)" }}>
        <h5>Fee Status</h5>
        <table className="table table-bordered mt-3">
          <thead >
            <tr>
              <th>Semester</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {studentData.fees.map((fee, index) => (
              <tr key={index}>
                <td>Semester {fee.semester}</td>
                <td className={fee.status === "Paid" ? "bg-success text-white" : "bg-danger text-white"}>
                  {fee.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
