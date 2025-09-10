import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/AdminAlerts.css"; 

const AdminAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/alerts`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
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
      <h2>All Alerts History</h2>
      {loading ? (
        <p>Loading alerts...</p>
      ) : alerts.length === 0 ? (
        <p>No alerts received yet.</p>
      ) : (
       <ul className="alert-list">
  {alerts.map((alert, index) => (
    <li key={alert._id ? alert._id.toString() : index.toString()} className="alert-item">
      <p className="alert-to">
        <strong style={{ color: "black" }}>To:</strong> {alert.studentId?.name} ({alert.studentId?.rollNumber}) - {alert.studentId?.branch}
      </p>
      <p className="alert-message">{alert.message}</p>
      <small className="alert-time">{new Date(alert.sentAt).toLocaleString()}</small>
    </li>
  ))}
</ul>

      )}
    </div>
  );
};

export default AdminAlerts;
