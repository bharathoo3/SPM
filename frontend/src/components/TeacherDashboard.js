import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import './TeacherDashboard.css';
import profileImg from './user.png';
import studentImg from './school.png';
import resultImg from './notepad.png';
import progressImg from './business.png';

const TeacherDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState('Profile');
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [credits, setCredits] = useState({
    assignments: 0,
    midterm: 0,
    finalExam: 0,
    projects: 0,
    attendance: 0,
    internships: 0,
    sports: 0,
    extraCurricular: 0,
    labWork: 0,
    research: 0
  });
  const maxCredits = {
    assignments: 12,
    midterm: 20,
    finalExam: 40,
    projects: 15,
    attendance: 10,
    internships: 25,
    sports: 10,
    extraCurricular: 8,
    labWork: 15,
    research: 20
  };
  
  

  useEffect(() => {
    if (!id) {
      console.error('Teacher ID is missing');
      return;
    }
    fetch(`http://localhost:5000/api/teachers/${id}`)
      .then(response => response.json())
      .then(data => {
        setTeacher(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teacher data:', error);
        setLoading(false);
      });
    fetch('http://localhost:5000/api/students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  }, [id]);

  const addStudent = async (newStudent) => {
    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add student');
      }
  
      const addedStudent = await response.json();
      alert('Student added successfully!');
      setStudents(prevStudents => [...prevStudents, addedStudent]); // Update state with new student
    } catch (error) {
      console.error('Error adding student:', error);
      alert(`Error: ${error.message}`);
    }
  };
  
  const removeStudent = async (studentID) => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${studentID}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove student');
      }
  
      setStudents(prevStudents => prevStudents.filter(student => student.studentID !== studentID)); // Update state
      alert('Student removed successfully!');
    } catch (error) {
      console.error('Error removing student:', error);
      alert(`Error: ${error.message}`);
    }
  };
  const handleCreditChange = (e) => {
    setCredits({ ...credits, [e.target.name]: Number(e.target.value) });
  };

  const submitProgress = async () => {
    console.log("Submitting credits:", credits);  // 🔍 Log credits before sending

    try {
        const response = await fetch(`http://localhost:5000/api/students/${selectedStudent.studentID}/updateCredits`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ creditsBreakdown: credits })  // ✅ Ensure proper structure
        });

        const data = await response.json();
        console.log("Response from backend:", data);  // 🔍 Log backend response

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        setSelectedStudent(data.student);  // ✅ Update UI with new data
        alert("Credits updated successfully!");
    } catch (error) {
        console.error("Error updating progress:", error);
    }
};


  
  

  const renderContent = () => {
    if (loading) return <p>Loading data...</p>;
    switch (selectedSection) {
      case 'Profile':
        return teacher ? (
          <div className="content">
            <h2>Teacher Profile</h2>
            <p><strong>Name:</strong> {teacher.name}</p>
            <p><strong>Email:</strong> {teacher.email}</p>
            <p><strong>Department:</strong> {teacher.Department}</p>
            <p><strong>Phone:</strong> {teacher.phone}</p>
          </div>
        ) : <p>No teacher data found.</p>;
        case 'Students':
  return (
    <div className="content">
      <h2>Student Management</h2>

      {/* Add & Remove Student Buttons */}
      <div className="button-container">
        <button onClick={() => {
          const fullName = prompt("Enter Student Name:");
          const studentID = prompt("Enter Student ID:");
          const email = prompt("Enter Student Email:");
          const major = prompt("Enter Major:");
          const year = parseInt(prompt("Enter Year:"), 10);

          if (fullName && studentID && email && major && year) {
            addStudent({
              fullName, studentID, email, major, year, 
              totalCredits: 0, remainingCredits: 0, 
              completedCourses: [], studentGPA: 0, password: studentID, 
              eligible: false, semesterGrades: []
            });
          } else {
            alert("All fields are required!");
          }
        }}>
          ➕ Add Student
        </button>

        <button onClick={() => {
          const studentID = prompt("Enter Student ID to Remove:");
          if (studentID) {
            removeStudent(studentID);
          } else {
            alert("Student ID is required!");
          }
        }}>
          ❌ Remove Student
        </button>
      </div>

      {/* Search Box */}
      

      {/* Student Table */}
      <table className="student-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Year</th>
            <th>Major</th>
          </tr>
        </thead>
        <tbody>
          {students.filter(student =>
            student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.studentID.toLowerCase().includes(searchTerm.toLowerCase())
          ).map(student => (
            <tr key={student._id}>
              <td>{student.studentID}</td>
              <td>{student.fullName}</td>
              <td>{student.email}</td>
              <td>{student.year}</td>
              <td>{student.major}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

        
  case 'Student Progress': 
  return (
    <div className="content">
      <h2>Student Progress</h2>
      <input
        type="text"
        placeholder="Enter Student ID or Name"
        onChange={(e) => {
          const student = students.find(s => s.studentID === e.target.value || s.fullName.toLowerCase() === e.target.value.toLowerCase());
          setSelectedStudent(student || null);
        }}
      />
      {selectedStudent && (
        <div>
          <h3>{selectedStudent.fullName} (ID: {selectedStudent.studentID})</h3>
  
          {/* 🔹 Allow Teacher to Update Marks */}
          <h4>Update Credits</h4>
          {Object.keys(selectedStudent.creditsBreakdown).map(key => (
            <div key={key}>
              <label>{key}</label>
              <input
  type="number"
  name={key}
  value={credits[key] || 0}  // Ensure default value is always a number
  min="0"
  max={maxCredits[key]}  // Set max limits dynamically
  onChange={handleCreditChange}
/>
            </div>
          ))}
  
          <button onClick={submitProgress}>Update Credits</button>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
      )}
    </div>
  );
  
      case 'Results':
        return (
          <div className="content">
            <h2>Student Results</h2>
            <table className="student-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Total Credits</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student._id}>
                    <td>{student.studentID}</td>
                    <td>{student.fullName}</td>
                    <td>{student.totalCredits || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return <h2>Welcome to the Teacher Dashboard</h2>;
    }
  };

  return (
    <div className="teacher-dashboard">
      <div className="navbar">
        <h1>Teacher Dashboard</h1>
        <button className="logout-button" onClick={() => navigate('/')}>Logout</button>
      </div>
      <div className="main-content">
        <div className="sidebar">
          {['Profile', 'Students', 'Results', 'Student Progress'].map(section => (
            <div key={section} className="sidebar-item" onClick={() => setSelectedSection(section)}>
              <img src={profileImg} alt={section} />
              <span>{section}</span>
            </div>
          ))}
        </div>
        <div className="content-area">{renderContent()}</div>
      </div>
      {/* <br/>
      <br/>
      <br/>
      <br/>
      <br/> */}
    </div>

  );
};
export default TeacherDashboard;
