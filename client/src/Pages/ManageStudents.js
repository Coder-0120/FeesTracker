import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/ManageStudents.css";
const branches = [
  { name: "CSE", color: "#ffccd5" },
  { name: "ECE", color: "#d0f4de" },
  { name: "ME", color: "#cce3ff" },
  { name: "CE", color: "#fce1a8" },
];

const ManageBranches = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4 text-primary">Select a Branch</h3>
      <div className="d-flex flex-column align-items-center gap-3">
        {branches.map((branch, index) => (
          <div
            key={index}
            className="branch-card"
            style={{ backgroundColor: branch.color }}
            onClick={() => navigate(`/manage-students/${branch.name}`)}
          >
            <h5 className="mb-0">{branch.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBranches;
