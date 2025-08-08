const express = require('express');
const app = express();
const Router = express.Router();
const bcrypt = require('bcryptjs');
const StudentModel = require('../models/Student');

Router.post("/register", async (req, res) => {

  const { name, branch, rollNumber, email, password ,admissionYear} = req.body;
  // console.log("Login request:", req.body);

  try {
    const existStudent = await StudentModel.findOne({ rollNumber });
    if (existStudent) {
      return res.status(400).json({ success: false, message: "Student already exists" });
    }

    const salt=await bcrypt.genSalt(10);
    const hashpwd=await bcrypt.hash(password,salt);

    const newStudent = new StudentModel({
      name,
      branch,
      rollNumber,
      email,
      password: hashpwd,
      admissionYear, 
    });

    await newStudent.save();
    return res.status(201).json({ success: true, message: "Student registered successfully" });

  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

Router.post("/login",async(req,res)=>{
  const{rollNumber,password}=req.body;
  try{
    const student = await StudentModel.findOne({ rollNumber });
    if (!student) {
      return res.status(400).json({ success: false, message: "Invalid roll number or password" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid roll number or password" });
    }

    return res.status(200).json({ success: true, message: "Login successful", student });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
Router.get('/branch/:branch', async (req, res) => {
  try {
    const branch = req.params.branch;
    const students = await StudentModel.find({ branch });
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

Router.put("/update-fee/:rollNumber/:semester", async (req, res) => {
  const { status } = req.body;
  const { rollNumber, semester } = req.params;

  try {
    const student = await StudentModel.findOne({ rollNumber });

    if (!student) return res.status(404).json({ message: "Student not found" });

    // Find the semester fee entry
    const feeEntry = student.fees.find(f => f.semester === parseInt(semester));

    if (feeEntry) {
      feeEntry.status = status; // update existing status
    } else {
      // If not found, add a new entry
      student.fees.push({ semester: parseInt(semester), status });
    }

    await student.save();

    res.json({ message: "Fee status updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Error updating fee status", error });
  }
});

Router.delete('/:id', async (req, res) => {
  const { id } = req.params; 

  try {
    const student = await StudentModel.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
});

Router.put("/updateFees/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedFees = req.body.fees;

    // Update the fees array directly
    const student = await StudentModel.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.fees = updatedFees; // Replace entire fees array
    await student.save();

    res.status(200).json({ message: "Fees updated successfully", student });
  } catch (err) {
    console.error("Error updating fees:", err);
    res.status(500).json({ message: "Server error" });
  }
});
Router.get("/:id", async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = Router;
