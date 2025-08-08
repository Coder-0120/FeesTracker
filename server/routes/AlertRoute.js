const express = require("express");
const router = express.Router();
const Alert = require("../models/Alert");

router.post("/send", async (req, res) => {
  const { studentId, message } = req.body;
  try {
    const alert = new Alert({ studentId, message });
    await alert.save();
    res.status(201).json({ success: true, alert });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/student/:id", async (req, res) => {
  try {
    const alerts = await Alert.find({ studentId: req.params.id }).sort({ sentAt: -1 });
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching alerts" });
  }
});

module.exports = router;
