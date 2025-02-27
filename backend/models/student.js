const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullName: { type: String, required: true },
  studentID: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  major: { type: String, required: true },
  year: { type: Number, required: true },
  
  // 🔹 Total and Remaining Credits
  totalCredits: { type: Number, default: 1000 },  // Total = 1000
  remainingCredits: { type: Number, default: 1000 },  // Starts at max

  // 🔹 Breakdown of Credits
  creditsBreakdown: {
    assignments: { type: Number, default: 0 },
    midterm: { type: Number, default: 0 },
    finalExam: { type: Number, default: 0 },
    projects: { type: Number, default: 0 },
    attendance: { type: Number, default: 0 },
    internships: { type: Number, default: 0 },
    sports: { type: Number, default: 0 },
    extraCurricular: { type: Number, default: 0 },
    labWork: { type: Number, default: 0 },
    research: { type: Number, default: 0 }
  },

  // 🔹 Course and GPA Info
  completedCourses: { type: [String], required: true },
  studentGPA: { type: Number },

  // 🔹 Authentication
  password: { type: String, required: true },
  eligible: { type: Boolean },

  // 🔹 Semester-wise Grades
  semesterGrades: [
    {
      course: { type: String, required: true },
      score: { type: String, required: true }
    }
  ]
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
