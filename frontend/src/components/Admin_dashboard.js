import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin_dashnorad.css'; // Importing CSS file
import managerImg from './manager.png'; // Sample images
import classImg from './presentation.png';
import studentImg from './school.png';
import teacherImg from './education.png';
import placementImg from './man.png';
import TeacherManagement from './TeacherManagement';
import './TeacherManagement.css';

const Admin_dashboard = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState('Admin');
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddTeacherForm, setShowAddTeacherForm] = useState(false);
  const [showViewTeachers, setShowViewTeachers] = useState(false);
  const [companyData, setCompanyData] = useState({
    companyName: '',
    visitDate: '',
    jobRole: '',
    salary: '',
    eligibility: '',
    poster: null
  });

  // Filter students based on the search term
  useEffect(() => {
    console.log("Fetching student data..."); // Debug log
    fetch('http://localhost:5000/api/students')
      .then(response => {
        console.log("Response status:", response.status); // Debug status
        return response.json();
      })
      .then(data => {
        console.log("Fetched data:", data); // Log received data
        setStudents(data);
      })
      .catch(error => console.error("Fetch error:", error));
  }, []);
  
  const filteredStudents = students.filter((student) => {
    return (
      student.studentID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };
  
  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    setCompanyData({ ...companyData, poster: file });
  };
  
  const addCompany = async (e) => {
    e.preventDefault();
    
    console.log('🔄 Company Data Before Sending:', companyData);
  
    const formData = new FormData();
    formData.append('companyName', companyData.companyName);
    formData.append('visitDate', companyData.visitDate);
    formData.append('jobRole', companyData.jobRole);
    formData.append('salary', companyData.salary);
    formData.append('eligibility', companyData.eligibility);
    formData.append('poster', companyData.poster);
  
    try {
      const response = await fetch('http://localhost:5000/api/companies', {
        method: 'POST',
        body: formData,
      });
  
      console.log('📡 Response Status:', response.status); // Debug Response Status
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server Response:', errorText);
        throw new Error(`Failed to add company: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('✅ Company Added Successfully:', data);
      alert('Company added successfully!');
    } catch (error) {
      console.error('❌ Error adding company:', error);
    }
  };
  


  // Fetch students data from db.json (public folder)
  useEffect(() => {
    fetch('http://localhost:5000/api/students') // Adjust the endpoint to match your Express route
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          console.error('Unexpected data format:', data);
          setStudents([]); // Ensure state is always an array
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setStudents([]); // Handle API failure gracefully
      });
  }, []);
  
  
  const handleLogout = () => {
    navigate('/');
  };

  const toggleEligibility = async (_id, currentEligibility) => {
    try {
      console.log("Toggling eligibility for:", _id);
  
      const response = await fetch(`http://localhost:5000/api/students/${_id}`, {  // ✅ Use port 5000
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eligible: !currentEligibility }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); // ✅ Ensure response is JSON
      console.log("Updated student:", data);
  
      // ✅ Update UI only if request was successful
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === _id ? { ...student, eligible: !currentEligibility } : student
        )
      );
    } catch (error) {
      console.error("Error updating eligibility:", error);
    }
  };
  
  
  
  // Function to render content based on selected section
  const renderContent = () => {
    switch (selectedSection) {
      case 'Admin':
        return <div><h2 className='tite'>Welcome Admin!</h2></div>;
      case 'Class':
        return (
          <div>
            <h2 className='tite'>Class Management</h2>
            <div className="class-cardss">
              <div className="class-card"><img src={classImg} alt="1st Year" /><span>1st Year</span></div>
              <div className="class-card"><img src={classImg} alt="2nd Year" /><span>2nd Year</span></div>
              <div className="class-card"><img src={classImg} alt="3rd Year" /><span>3rd Year</span></div>
              <div className="class-card"><img src={classImg} alt="4th Year" /><span>4th Year</span></div>
            </div>
          </div>
        );
      case 'Student':
        return (
          <div>
            <h2 className="tite">Student Management</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by Roll No or Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
              />
            </div>

            <table className="student-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Department</th>
                  <th>Progress Mark</th>
                  <th>Placement Eligibility</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr><td colSpan="7">No students found</td></tr>
                ) : (
                  filteredStudents.map((student, idx) => (
                    <tr key={idx}>
                      <td>{student.studentID}</td>
                      <td>{student.fullName}</td>
                      <td>{student.email}</td>
                      <td>{student.mobile}</td>
                      <td>{student.major}</td>
                      <td>{student.totalCredits}</td>
                      <td>
                        {/* Display eligibility buttons */}
                        <button
                          className={student.eligible ? 'eligible' : 'not-eligible'}

                          onClick={() => toggleEligibility(student._id, student.eligible)}
                        >
                          {student.eligible === true ? '✔' : '✘'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );
        case 'Teacher':
          return (
            <div>
              <h2 className='tite'>Teacher Management</h2>
              <div className="class-cardss">
                {!showAddTeacherForm && !showViewTeachers ? (
                  <>
                    <div 
                      className="class-card" 
                      id='tech-a'
                      onClick={() => {
                        setShowAddTeacherForm(true);
                        setShowViewTeachers(false);
                      }}
                    >
                      <img src={classImg} alt="Add Teachers" />
                      <span>Add Teachers</span>
                    </div>
        
                    <div 
                      className="class-card" 
                      id='tech-a'
                      onClick={() => {
                        setShowViewTeachers(true);
                        setShowAddTeacherForm(false);
                      }}
                    >
                      <img src={classImg} alt="View Teachers" />
                      <span>View Teachers</span>
                    </div>
                  </>
                ) : showAddTeacherForm ? (
                  <TeacherManagement view="addTeacher" onBack={() => {
                    setShowAddTeacherForm(false);
                    setShowViewTeachers(false);
                  }} />
                ) : (
                  <TeacherManagement view="viewTeachers" onBack={() => {
                    setShowAddTeacherForm(false);
                    setShowViewTeachers(false);
                  }} />
                )}
              </div>
            </div>
          );
        
        
          
          case 'Placement':
            return (
              <div id='box'>
                <h2 className='tite'>Placement Management</h2>
                <form onSubmit={addCompany} className="company-form">
                  <input name="companyName" placeholder="Company Name" onChange={handleInputChange} required />
                  <input name="visitDate" type="date" onChange={handleInputChange} required />
                  <input name="jobRole" placeholder="Job Role" onChange={handleInputChange} required />
                  <input name="salary" placeholder="salary (LPA)" onChange={handleInputChange} required />
                  <input name="eligibility" placeholder="Eligibility Criteria" onChange={handleInputChange} required />
                  <label>Upload Company Poster:</label>
                  <input type="file" name="poster" accept="image/*" onChange={handlePosterChange} required />
                  <button type="submit">Add Company</button>
                </form>
              </div>
            );
          
      default:
        return (
          <div>
            <h2 className='tite'> Admin Dashboard</h2>
            <p>Welcome to the Admin Dashboard! Select a section to manage.</p>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="navbar">
        <div className="navbar-left">
          <span className="navbar-logo">Dashboard</span>
        </div>
        <div className="navbar-right">
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="main-content">
        <div className="sidebar">
          <div className="sidebar-item" onClick={() => setSelectedSection('Admin')}>
            <img src={managerImg} alt="Admin" />
            <span>Admin</span>
          </div>
          <div className="sidebar-item" onClick={() => setSelectedSection('Class')}>
            <img src={classImg} alt="Class" />
            <span>Class</span>
          </div>
          <div className="sidebar-item" onClick={() => setSelectedSection('Student')}>
            <img src={studentImg} alt="Student" />
            <span>Student</span>
          </div>
          <div className="sidebar-item" onClick={() => setSelectedSection('Teacher')}>
            <img src={teacherImg} alt="Teacher" />
            <span>Teacher</span>
          </div>
          <div className="sidebar-item" onClick={() => setSelectedSection('Placement')}>
            <img src={placementImg} alt="Placement" />
            <span>Placement</span>
          </div>
        </div>

        <div className="contente">
          <div className="content-header"></div>
          <div className="class-cards">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_dashboard;
