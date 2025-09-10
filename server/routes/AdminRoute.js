const express = require("express");
const app = express();
const Router = express.Router();
const AdminModel = require("../models/Admin");
const AlertModel = require("../models/Alert");
const StudentModel = require("../models/Student");
const jwt=require("jsonwebtoken");
const Verifytoken = require("../middlewares/Verifytoken");

Router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const storepwd = admin.password;
    const isMatch = password === storepwd;
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ success: true, message: "Login successful", token,
        admin:{
          id:admin._id,
          email:admin.email
        }
       });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
Router.get("/alerts",Verifytoken, async (req, res) => {
  try {
    const alerts = await AlertModel.find()
      .populate("studentId", "name rollNumber branch")
      .sort({ sentAt: -1 });
    res.status(200).json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({ message: "Error fetching alerts" });
  }
});

Router.get("/students-by-branch", Verifytoken,async (req, res) => {
  try {
    const students = await StudentModel.aggregate([
      {
        $group: {
          _id: "$branch",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          branch: "$_id",
          count: 1,
        },
      },
    ]);
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students by branch:", error);
    res.status(500).json({ message: "Error fetching students by branch" });
  }
});
Router.get("/students-by-year",Verifytoken, async (req, res) => {
  try {
    const students = await StudentModel.aggregate([
      {
        $group: {
          _id: "$admissionYear",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id",
          count: 1,
        },
      },
      { $sort: { year: 1 } },
    ]);
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students by year:", error);
    res.status(500).json({ message: "Error fetching students by year" });
  }
});
Router.get("/students-fee-count-by-semester",Verifytoken, async (req, res) => {
  try {
    const result = await StudentModel.aggregate([
      { $unwind: "$fees" },
      { $match: { "fees.status": "Paid" } },
      {
        $group: {
          _id: "$fees.semester",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          semester: "$_id",
          count: 1,
          _id: 0,
        },
      },
      { $sort: { semester: 1 } },
    ]);

    res.json(result);
  } catch (err) {
    console.error("Error fetching fee stats by semester:", err);
    res.status(500).json({ error: "Failed to fetch fee stats" });
  }
});

module.exports = Router;
