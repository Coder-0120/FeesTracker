import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/StudentAlert.css"; 

const StudentAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentInfo = JSON.parse(localStorage.getItem("studentInfo"))?.student;
  const studentId = studentInfo?._id;



  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/alerts/student/${studentId}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("studentToken")}`,
        }
      });
      setAlerts(res.data);
    } catch (err) {
      console.error("Error fetching alerts:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-alert-container">
      <h2>Notifications</h2>
      {loading ? (
        <p>Loading alerts...</p>
      ) : alerts.length === 0 ? (
        <p>No alerts received yet.</p>
      ) : (
        <ul className="alert-list">
            {alerts.map((alert) => (
                <li key={alert._id} className="alert-item">
                <p>{alert.message}</p>
                <small>{new Date(alert.sentAt).toLocaleString()}</small>
                </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default StudentAlerts;
