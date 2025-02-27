const express = require('express');
const Teacher = require('../models/teacher'); // Import the Teacher model
const router = express.Router();

// ✅ GET all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST route to add a teacher
router.post('/', async (req, res) => {
  try {
    const { name, subject, email, phone, password, Department, Role } = req.body;

    if (!name || !subject || !email || !phone || !password || !Department || !Role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTeacher = new Teacher({ name, subject, email, phone, password, Department, Role });
    const savedTeacher = await newTeacher.save();
    
    res.status(201).json(savedTeacher);
  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ DELETE (Remove a teacher by ID)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔄 Received Delete Request for ID:", id); // ✅ Debugging
    const deletedTeacher = await Teacher.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    console.error("❌ Server Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
