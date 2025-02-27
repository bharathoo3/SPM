import React, { useState, useEffect } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import "./Student_dashboard.css";
import profileImg from "./man.png";
import creditsImg from "./logo1.png";
import resultImg from "./presentation.png";
import announceImg from "./placement.png";

const StudentDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("Profile");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companies, setCompanies] = useState([]); 

  useEffect(() => {
    if (!id) {
      console.error("Error: Student ID is missing from URL.");
      return;
    }
    
    const fetchStudentData = async () => {
      try {
        console.log(`Fetching student with studentID: ${id}`);
        const response = await fetch(`http://localhost:5000/api/students/${id}`);
    
        if (!response.ok) {
          throw new Error(`Failed to fetch student data. Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("✅ Fetched student data:", data);
        setStudentData(data);
      } catch (error) {
        console.error("❌ Error fetching student data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudentData();
  }, [id]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/companies"); 
        if (!response.ok) {
          throw new Error(`Failed to fetch companies. Status: ${response.status}`);
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
  
    <div className="std-dashboard">
      <div className="std-navbar">
        <div className="std-navbar-left">
          <span className="std-navbar-logo">Student Dashboard</span>
        </div>
        <div className="std-navbar-right">
          <button className="std-btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="std-main-content">
        <div className="std-sidebar">
          <div className="std-sidebar-item" onClick={() => setSelectedSection("Profile")}>
            <img src={profileImg} alt="Profile" />
            <span>Profile</span>
          </div>
          <div className="std-sidebar-item" onClick={() => setSelectedSection("Credits")}>
            <img src={creditsImg} alt="Credits" />
            <span>Credits</span>
          </div>
          <div className="std-sidebar-item" onClick={() => setSelectedSection("Exam Result")}>
            <img src={resultImg} alt="Exam Result" />
            <span>Exam Result</span>
          </div>
          <div className="std-sidebar-item" onClick={() => setSelectedSection("Campus Announcements")}>
            <img src={announceImg} alt="Announcements" />
            <span>Campus Announce</span>
          </div>
        </div>
     

        <div className="std-content">
          {loading ? (
            <p>Loading student data...</p>
          ) : error ? (
            <p className="std-error">Error: {error}</p>
          ) : studentData ? (
            <div>
              {selectedSection === "Profile" && (
                <div className="std-section std-profile-container">
                  <div className="std-profile-card">
                    <img src={profileImg} alt="Profile" className="std-profile-avatar" />
                    <div className="std-profile-details">
                      <h2 className="std-section-heading">Student Profile</h2>
                      <div className="std-profile-info-grid">
                        <p><strong>Name:</strong> {studentData.fullName || "N/A"}</p>
                        <p><strong>Student ID:</strong> {studentData.studentID || "N/A"}</p>
                        <p><strong>Email:</strong> {studentData.email || "N/A"}</p>
                        <p><strong>Major:</strong> {studentData.major || "N/A"}</p>
                        <p><strong>Year:</strong> {studentData.year || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === "Credits" && (
                <div className="std-section">
                  <h2 className="std-section-heading">Credits Overview</h2>
                  <p><strong>Total Credits:</strong> {studentData.totalCredits || 0}</p>
                  <p><strong>Breakdown:</strong></p>
                  <ul>
                    {studentData.creditsBreakdown ? (
                      Object.entries(studentData.creditsBreakdown).map(([category, value]) => (
                        <li key={category}><strong>{category}:</strong> {value}</li>
                      ))
                    ) : (
                      <p>No credit data available.</p>
                    )}
                  </ul>
                </div>
              )}

              {selectedSection === "Exam Result" && (
                <div className="std-section">
                  <h2 className="std-section-heading">Exam Results</h2>
                  <p>Feature under development.</p>
                </div>
              )}

              {selectedSection === "Campus Announcements" && (
                <div className="std-section">
                  <h2 className="std-section-heading">Campus Announcements</h2>
                  {companies.length > 0 ? (
                    <div className="std-companies-list">
                      {companies.map((company) => (
                        <div key={company._id} className="std-company-card">
                          {company.poster && <img src={company.poster} alt="Company Poster" className="std-company-poster" />}
                          <h3>{company.companyName}</h3>
                          <p><strong>Job Role:</strong> {company.jobRole}</p>
                          <p><strong>Salary:</strong> {company.salary || "Not Specified"}</p>
                          <p><strong>Location:</strong> {company.location}</p>
                          <p><strong>Visit Date:</strong> {company.visitDate || "TBD"}</p>
                          <p><strong>Eligibility:</strong> {company.eligibility}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No announcements available.</p>
                  )}
                </div>
              )}

            </div>
          ) : (
            <p>No student data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
