import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF4560'];

const Analytics = () => {
  const [branchData, setBranchData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [feeSemData, setFeeSemData] = useState([]);
  

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const branchRes = await axios.get("http://localhost:5000/api/admin/students-by-branch");
        const yearRes = await axios.get("http://localhost:5000/api/admin/students-by-year");
        const feeSemRes = await axios.get("http://localhost:5000/api/admin/students-fee-count-by-semester");
        setBranchData(branchRes.data);
        setYearData(yearRes.data);
        setFeeSemData(feeSemRes.data);
      } catch (error) {
        console.error("Error fetching analytics data", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2 style={{ marginBottom: "2rem" }}>Analytics Overview</h2>

      <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
        <div>
          <h3>Student Distribution by Branch</h3>
          <ResponsiveContainer width={400} height={400}>
            <PieChart>
              <Pie
                data={branchData}
                dataKey="count"
                nameKey="branch"
                outerRadius={130}
                label
              >
                {branchData.map((entry, index) => (
                  <Cell key={`cell-branch-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
         <div>
          <h3>Students Paid Fees (Semester-wise)</h3>
          <ResponsiveContainer width={480} height={400} >
            <BarChart data={feeSemData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semester" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="count" fill="#e9a12cff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3>Student Distribution by Year</h3>
          <ResponsiveContainer width={400} height={400}>
            <PieChart>
              <Pie
                data={yearData}
                dataKey="count"
                nameKey="year"
                outerRadius={130}
                label
              >
                {yearData.map((entry, index) => (
                  <Cell key={`cell-year-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

       
      </div>
    </div>
  );
};

export default Analytics;
