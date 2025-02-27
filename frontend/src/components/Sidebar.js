import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Make sure to style the sidebar

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <Link to="/admin">
          <img src="admin-icon.png" alt="Admin" />
          Admin
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/class">
          <img src="class-icon.png" alt="Class" />
          Class
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/student">
          <img src="student-icon.png" alt="Student" />
          Student
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/teacher">
          <img src="teacher-icon.png" alt="Teacher" />
          Teacher
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/placement">
          <img src="placement-icon.png" alt="Placement" />
          Placement
        </Link>
      </div>
    </div>
  );
}
