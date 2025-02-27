const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Student = require('./models/student'); // Import Student model

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/student_dashboard';

// ✅ Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5001', // Allow requests from React frontend
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  credentials: true
}));

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err.message);
  process.exit(1);
});

// ✅ Import Routes
const studentRoutes = require('./routes/students');
const companyRoutes = require('./routes/companies');
const teacherRoutes = require('./routes/teachers');

// ✅ Use Routes
app.use('/api/students', studentRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/teachers', teacherRoutes);

// ✅ PATCH Route to Update Student Eligibility
app.patch('/api/students/:id/eligibility', async (req, res) => {
  try {
    const { id } = req.params;  // MongoDB _id
    const { eligible } = req.body;

    console.log("🔄 Updating Student ID:", id);
    console.log("✅ New eligibility status:", eligible);

    if (typeof eligible !== 'boolean') {
      return res.status(400).json({ message: 'Invalid eligibility value. Must be true or false.' });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { eligible },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(updatedStudent);
  } catch (error) {
    console.error('❌ Error updating eligibility:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ PUT Route to Update Student Credits
app.put('/api/students/:id/updateCredits', async (req, res) => {
  try {
    const { id } = req.params;
    const { creditsBreakdown } = req.body;

    if (!creditsBreakdown || typeof creditsBreakdown !== 'object') {
      return res.status(400).json({ message: "Invalid credits format" });
    }

    // Calculate total credits dynamically
    const totalCredits = Object.values(creditsBreakdown).reduce((sum, value) => sum + value, 0);

    const updatedStudent = await Student.findOneAndUpdate(
      { studentID: id },
      { $set: { creditsBreakdown, totalCredits } },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Credits updated successfully", student: updatedStudent });
  } catch (error) {
    console.error("❌ Error updating credits:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ GET Route to Fetch Student by ID

app.get("/api/students/:id", async (req, res) => {
  try {
    const studentID = req.params.id;
    console.log("🔍 Searching for Student ID:", studentID);

    // Convert string to ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentID)) {
      console.log("❌ Invalid ObjectId format");
      return res.status(400).json({ message: "Invalid student ID format" });
    }

    const student = await Student.findById(new mongoose.Types.ObjectId(studentID));

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





// ✅ Default Route
app.get('/', (req, res) => {
  res.json({ message: '✅ API is running...' });
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
