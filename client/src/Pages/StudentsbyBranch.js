import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Styles/StudentsbyBranch.css";

const StudentsbyBranch = () => {
  const { branch } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedFees, setEditedFees] = useState({});
  const [selectedYear, setSelectedYear] = useState("All");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [targetStudentId, setTargetStudentId] = useState(null);

  const totalSemesters = 8;

  useEffect(() => {
    fetchStudents();
  }, [branch]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/student/branch/${branch}`,{
           headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const sorted = res.data.sort((a, b) => {
        // Calculate study year
        const currentYear = new Date().getFullYear();
        const yearA = Math.min(
          Math.max(currentYear - a.admissionYear + 1, 1),
          4
        );
        const yearB = Math.min(
          Math.max(currentYear - b.admissionYear + 1, 1),
          4
        );
        if (yearA !== yearB) {
          return yearA - yearB;
        }
        return a.rollNumber.localeCompare(b.rollNumber, undefined, {
          numeric: true,
        });
      });
      setStudents(sorted);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStudyYear = (admissionYear) => {
    const currentYear = new Date().getFullYear();
    const year = currentYear - admissionYear + 1;
    return year > 4 ? 4 : year < 1 ? 1 : year;
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    const feesMap = {};
    for (let i = 1; i <= totalSemesters; i++) {
      const semFee = student.fees?.find((f) => f.semester === i);
      feesMap[i] = semFee?.status || "Unpaid";
    }
    setEditedFees(feesMap);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedFees({});
  };

  const handleStatusChange = (semester, value) => {
    setEditedFees((prev) => ({ ...prev, [semester]: value }));
  };

  const handleSendAlertClick = (studentId) => {
    setTargetStudentId(studentId);
    setShowAlertModal(true);
  };

  const sendAlertToStudent = async () => {
    try {
      await axios.post("http://localhost:5000/api/alerts/send", {
        studentId: targetStudentId,
        message: alertMessage,
      });
      alert("Alert sent successfully!");
      setShowAlertModal(false);
      setAlertMessage("");
    } catch (err) {
      console.error("Error sending alert:", err);
    }
  };

  const handleSave = async (studentId) => {
    try {
      const feesToSend = Object.entries(editedFees).map(
        ([semester, status]) => ({
          semester: Number(semester),
          status,
        })
      );
      await axios.put(
        `http://localhost:5000/api/student/updateFees/${studentId}`,
        {
          fees: feesToSend,
        }
      );
      fetchStudents();
    } catch (error) {
      console.error("Error updating fees:", error);
    } finally {
      handleCancel();
    }
  };

  const handleDelete = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;
    try {
      await axios.delete(`http://localhost:5000/api/student/${studentId}`);
      setStudents((prev) => prev.filter((s) => s._id !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const filteredStudents = students.filter((student) => {
    if (selectedYear === "All") return true;
    return getStudyYear(student.admissionYear) === Number(selectedYear);
  });

  return (
    <div className="students-container">
      <h2>Students from {branch} Branch</h2>

      <div className="students-toolbar">
        <div className="filter-select">
          <label>Filter by Study Year: </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">All</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>
        <button className="print-btn" onClick={() => window.print()}>
          🖨️ Print / Save as PDF
        </button>
        {showAlertModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>Send Alert</h3>
              <textarea
                rows={4}
                placeholder="Enter your message..."
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
              />
              <div className="modal-actions">
                <button onClick={sendAlertToStudent}>Send</button>
                <button onClick={() => setShowAlertModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredStudents.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="students-table">
            <thead className="table-header">
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Year</th>
                {[...Array(totalSemesters)].map((_, i) => (
                  <th key={i}>Sem {i + 1}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const isEditing = editingId === student._id;
                return (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.rollNumber}</td>
                    <td>{getStudyYear(student.admissionYear)}</td>
                    {[...Array(totalSemesters)].map((_, i) => {
                      const sem = i + 1;
                      const semFee = Array.isArray(student.fees)
                        ? student.fees.find((f) => f.semester === sem)
                        : null;
                      const status = semFee?.status || "Unpaid";
                      return (
                        <td
                          key={i}
                          style={{ border: "2px solid #067894" }}
                          className={
                            !isEditing
                              ? status === "Paid"
                                ? "fee-paid"
                                : "fee-unpaid"
                              : ""
                          }
                        >
                          {isEditing ? (
                            <select
                              value={editedFees[sem]}
                              onChange={(e) =>
                                handleStatusChange(sem, e.target.value)
                              }
                            >
                              <option value="Paid">Paid</option>
                              <option value="Unpaid">Unpaid</option>
                            </select>
                          ) : (
                            status
                          )}
                        </td>
                      );
                    })}
                    <td>
                      {isEditing ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                          }}
                        >
                          <button
                            onClick={() => handleSave(student._id)}
                            style={{
                              backgroundColor: "#4CAF50",
                              color: "white",
                            }}
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            style={{
                              backgroundColor: "#f0ad4e",
                              color: "white",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                          }}
                        >
                          <button
                            onClick={() => handleEdit(student)}
                            style={{
                              backgroundColor: "#0275d8",
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(student._id)}
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleSendAlertClick(student._id)}
                            style={{
                              backgroundColor: "#ffff0bff",
                              color: "black",
                              fontWeight: "bold",
                            }}
                          >
                            Alert
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentsbyBranch;
