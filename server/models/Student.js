const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  semester: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Paid", "Unpaid"],
    default: "Unpaid",
  },
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admissionYear:{
    type: Number,
    required: true,
  },
  fees: {
    type: [feeSchema],
    default: undefined, 
  },
});

// 🛠 Automatically fill `fees` array for 8 semesters if not provided
studentSchema.pre("save", function (next) {
  if (!this.fees || this.fees.length === 0) {
    this.fees = Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1,
      status: "Unpaid",
    }));
  }
  next();
});

module.exports = mongoose.model("Student", studentSchema);
