const express = require("express");
const Student = require("../models/student");
const mongoose = require("mongoose");
const router = express.Router();

/** ==============================
 * ✅ Get ALL Students
 * =============================== */
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/** ==============================
 * ✅ Get Student by MongoDB _id
 * =============================== */
router.get("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid student ID format" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/** ==============================
 * ✅ Get Student by studentID (Custom ID)
 * =============================== */
router.get('/studentID/:studentID', async (req, res) => {
  try {
    console.log("🔍 Searching for Student ID:", req.params.studentID);

    const student = await Student.findOne({ studentID: req.params.studentID });

    if (!student) {
      console.log("❌ Student not found in database.");
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error("❌ Error fetching student:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/** ==============================
 * ✅ Create a New Student
 * =============================== */
router.post("/", async (req, res) => {
  console.log("📩 Received Data:", req.body); // Debugging log

  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.error("❌ Error Saving Student:", err);
    res.status(400).json({ message: err.message });
  }
});

/** ==============================
 * ✅ Update Student Details
 * =============================== */
router.patch("/:studentID", async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { studentID: req.params.studentID }, 
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/** ==============================
 * ✅ Update Student Credits
 * =============================== */
router.put("/:studentID/updateCredits", async (req, res) => {
  try {
    const { studentID } = req.params;
    const { creditsBreakdown } = req.body;

    console.log("📌 Student ID:", studentID);
    console.log("📌 Credits Breakdown:", creditsBreakdown);

    // Find student by studentID
    let student = await Student.findOne({ studentID });

    if (!student) {
      console.log("❌ Student not found");
      return res.status(404).json({ message: "Student not found" });
    }

    // Validate creditsBreakdown format
    if (!creditsBreakdown || typeof creditsBreakdown !== "object") {
      return res.status(400).json({ message: "Invalid credits format" });
    }

    // Update credits breakdown and totalCredits
    student.creditsBreakdown = creditsBreakdown;
    student.totalCredits = Object.values(creditsBreakdown).reduce((sum, val) => sum + val, 0);

    await student.save();

    console.log("✅ Successfully updated credits:", student.totalCredits);
    res.json({ message: "Credits updated successfully", student });

  } catch (error) {
    console.error("🔥 ERROR updating credits:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/** ==============================
 * ✅ Delete a Student by studentID
 * =============================== */
router.delete("/:studentID", async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ studentID: req.params.studentID });

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
